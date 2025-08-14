"use client";

import { useState, useEffect } from "react";
import { useCourses } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Lecture, PDFNote } from "@/types";
import { toast } from "sonner";
import { createData, updateData } from "@/server/serverAction";
import { useRouter } from "next/navigation";

interface LectureFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
  lecture?: Lecture | null;
}

export const LectureFormDialog = ({ open, onOpenChange, moduleId, lecture }: LectureFormDialogProps) => {
  const { addLecture, updateLecture } = useCourses();
  const [rawUrl, setRawUrl] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    pdfNotes: [] as PDFNote[],
  });

  useEffect(() => {
    if (lecture) {
      setFormData({
        title: lecture.title,
        videoUrl: lecture.videoUrl,
        pdfNotes: [...(lecture?.pdfNotes ?? [])],
      });
    } else {
      setFormData({
        title: "",
        videoUrl: "",
        pdfNotes: [],
      });
    }
  }, [lecture, open]);

  const handleCreate = async (data: Lecture) => {
    try {
      const res = await createData("lecture/create-lecture", data);
      if (res?.success) {
        toast.success("lecture created successfully");
      } else {
        toast.error(res?.message || "Unable to create lecture.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      router.refresh();
      onOpenChange(false);
    }
  };

  const handleEdit = async (data: Partial<Lecture>) => {
    if (!lecture) {
      toast.warning("No lecture selected for editing.");
      return;
    }
    try {
      const res = await updateData("lecture/update-lecture", lecture?._id as string, data, "");
      if (res?.success) {
        toast.success("lecture updated successfully.");
      } else {
        toast.error(res?.message || "Unable to update lecture.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      onOpenChange(false);
      router.refresh();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lecture) {
      console.log({ ...formData });
      handleEdit(formData);
    } else {
      handleCreate({ ...formData, moduleId });
    }
    setRawUrl("");
    onOpenChange(false);
  };

  const addPdfNote = () => {
    const newNote: PDFNote = {
      title: "",
      url: "",
    };
    setFormData({
      ...formData,
      pdfNotes: [...formData.pdfNotes, newNote],
    });
  };

  const removePdfNote = (index: number) => {
    setFormData({
      ...formData,
      pdfNotes: formData.pdfNotes.filter((_, i) => i !== index),
    });
  };

  const updatePdfNote = (index: number, field: "title" | "url", value: string) => {
    const updatedNotes = formData.pdfNotes.map((note, i) => (i === index ? { ...note, [field]: value } : note));
    setFormData({
      ...formData,
      pdfNotes: updatedNotes,
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lecture ? "Edit Lecture" : "Add New Lecture"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Lecture Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter lecture title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">YouTube Video URL</Label>
            <Input
              id="videoUrl"
              value={rawUrl !== "" ? rawUrl : formData.videoUrl}
              onChange={(e) => (
                setFormData({ ...formData, videoUrl: getYouTubeEmbedUrl(e.target.value) || "" }),
                setRawUrl(e.target.value)
              )}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              type="url"
            />

            {formData.videoUrl && (
              <div className="mt-2">
                <iframe src={formData.videoUrl} className="w-full h-48 rounded" allowFullScreen />
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
              <div key={note?._id} className="flex items-center space-x-2 p-3 border rounded">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="PDF Title"
                    value={note.title}
                    onChange={(e) => updatePdfNote(index, "title", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="PDF URL (optional for demo)"
                    value={note.url}
                    type="url"
                    required
                    onChange={(e) => updatePdfNote(index, "url", e.target.value)}
                  />
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => removePdfNote(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => (onOpenChange(false), setRawUrl(""))}>
              Cancel
            </Button>
            <Button type="submit">{lecture ? "Update Lecture" : "Add Lecture"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
