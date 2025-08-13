'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Course, TCreateCourse } from '@/types';
import { defaultThumbnails } from '@/lib/data';

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addCourse: (data: TCreateCourse | Course) => void;
  course?: Course | null;
}

export const CourseFormDialog = ({ open, onOpenChange, addCourse: handleCourse, course }: CourseFormDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnail: course.thumbnail
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        thumbnail: ''
      });
    }
  }, [course, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(course)
    console.log(formData)



    if (course) {
      handleCourse(formData);
    } else {
      handleCourse(formData);
    }

  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course ? 'Edit Course' : 'Create New Course'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter course description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="Enter image URL"
              required
            />
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Or choose from defaults:</p>
              <div className="grid grid-cols-4 gap-2">
                {defaultThumbnails?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover rounded cursor-pointer hover:ring-2 hover:ring-primary"
                    onClick={() => setFormData({ ...formData, thumbnail: url })}
                  />
                ))}
              </div>
            </div>
            {formData.thumbnail && (
              <div className="mt-2">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="w-full max-w-xs h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {course ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};