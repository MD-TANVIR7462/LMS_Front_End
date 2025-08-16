"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateModule, Module } from "@/types";
import { toast } from "sonner";
import { createData, updateData } from "@/server/serverAction";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/features/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

interface ModuleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  module?: Module | null;
}

export const ModuleFormDialog = ({ open, onOpenChange, courseId, module }: ModuleFormDialogProps) => {
  const [title, setTitle] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (module) {
      setTitle(module.title);
    } else {
      setTitle("");
    }
  }, [module, open]);
  const token = useAppSelector(useCurrentToken);
  const handleCreate = async (data: CreateModule) => {
    try {
      const res = await createData("module/create-module", data, token as string);
      if (res?.success) {
        toast.success("module created successfully");
      } else {
        toast.error(res?.message || "Unable to create module.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      setTitle("");
      router.refresh();
      onOpenChange(false);
    }
  };

  const handleEdit = async (data: Partial<Module>) => {
    if (!module) {
      toast.warning("No module selected for editing.");
      return;
    }
    try {
      const res = await updateData("module/update-module", module?._id as string, data, "");
      if (res?.success) {
        toast.success("module updated successfully.");
      } else {
        toast.error(res?.message || "Unable to update module.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      setTitle("");
      onOpenChange(false);
      router.refresh();
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (module) {
      handleEdit({ _id: module?._id, title });
    } else {
      handleCreate({ title, courseId, moduleNumber: 2 });
    }

    setTitle("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{module ? "Edit Module" : "Add New Module"}</DialogTitle>
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
            <Button type="submit">{module ? "Update Module" : "Add Module"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
