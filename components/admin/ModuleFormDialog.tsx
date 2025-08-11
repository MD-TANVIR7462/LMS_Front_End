'use client';

import { useState, useEffect } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Module } from '@/types';

interface ModuleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  module?: Module | null;
}

export const ModuleFormDialog = ({ open, onOpenChange, courseId, module }: ModuleFormDialogProps) => {
  const { addModule, updateModule } = useCourses();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (module) {
      setTitle(module.title);
    } else {
      setTitle('');
    }
  }, [module, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (module) {
      updateModule(module.id, { title });
    } else {
      addModule(courseId, { title, courseId });
    }
    
    setTitle('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{module ? 'Edit Module' : 'Add New Module'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Module Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter module title"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {module ? 'Update Module' : 'Add Module'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};