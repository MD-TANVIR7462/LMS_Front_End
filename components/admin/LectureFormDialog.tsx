'use client';

import { useState, useEffect } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { Lecture, PDFNote } from '@/types';

interface LectureFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
  lecture?: Lecture | null;
}

export const LectureFormDialog = ({ open, onOpenChange, moduleId, lecture }: LectureFormDialogProps) => {
  const { addLecture, updateLecture } = useCourses();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    pdfNotes: [] as PDFNote[]
  });

  useEffect(() => {
    if (lecture) {
      setFormData({
        title: lecture.title,
        videoUrl: lecture.videoUrl,
        pdfNotes: [...lecture.pdfNotes]
      });
    } else {
      setFormData({
        title: '',
        videoUrl: '',
        pdfNotes: []
      });
    }
  }, [lecture, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lecture) {
      updateLecture(lecture.id, formData);
    } else {
      addLecture(moduleId, { ...formData, moduleId });
    }
    
    onOpenChange(false);
  };

  const addPdfNote = () => {
    const newNote: PDFNote = {
      id: Date.now().toString(),
      title: '',
      url: '#'
    };
    setFormData({
      ...formData,
      pdfNotes: [...formData.pdfNotes, newNote]
    });
  };

  const removePdfNote = (index: number) => {
    setFormData({
      ...formData,
      pdfNotes: formData.pdfNotes.filter((_, i) => i !== index)
    });
  };

  const updatePdfNote = (index: number, field: 'title' | 'url', value: string) => {
    const updatedNotes = formData.pdfNotes.map((note, i) => 
      i === index ? { ...note, [field]: value } : note
    );
    setFormData({
      ...formData,
      pdfNotes: updatedNotes
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lecture ? 'Edit Lecture' : 'Add New Lecture'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Lecture Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter lecture title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">YouTube Video URL</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData({...formData, videoUrl: getYouTubeEmbedUrl(e.target.value)})}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            {formData.videoUrl && (
              <div className="mt-2">
                <iframe
                  src={formData.videoUrl}
                  className="w-full h-48 rounded"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>PDF Notes</Label>
              <Button type="button" size="sm" onClick={addPdfNote}>
                <Plus className="h-4 w-4 mr-1" />
                Add PDF
              </Button>
            </div>
            
            {formData.pdfNotes.map((note, index) => (
              <div key={note.id} className="flex items-center space-x-2 p-3 border rounded">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="PDF Title"
                    value={note.title}
                    onChange={(e) => updatePdfNote(index, 'title', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="PDF URL (optional for demo)"
                    value={note.url}
                    onChange={(e) => updatePdfNote(index, 'url', e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removePdfNote(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {lecture ? 'Update Lecture' : 'Add Lecture'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};