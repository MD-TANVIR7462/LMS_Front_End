import { deleteData } from "@/server/serverAction";
import { toast } from "sonner";


export const ConfirmAndDelete = (
  id: string,
  route: string,
  router: any,
  {
    successMessage = "Item deleted successfully.",
    errorMessage = "Failed to delete item.",
    cancelMessage = "Deletion canceled.",
    confirmationMessage = "You want to delete this item?",
  }: {
    successMessage?: string;
    errorMessage?: string;
    cancelMessage?: string;
    confirmationMessage?: string;
  } = {}
) => {
  if (!id || !route) return;

  toast.custom((t) => (
    <div className="flex items-center justify-between gap-4 bg-white dark:bg-zinc-900 text-sm border border-zinc-300 dark:border-zinc-700 px-4 py-3 rounded-lg shadow-lg w-full max-w-lg">
      <span className="text-zinc-900 dark:text-zinc-100">{confirmationMessage}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            toast.dismiss(t);
            toast.info(cancelMessage);
          }}
          className="px-3 py-1 rounded-md text-sm bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          No
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t);
            try {
              const res = await deleteData(route, id);
              if (res.success) {
                toast.success(successMessage);
              } else {
                toast.error(res?.message || errorMessage);
              }
            } catch (err: any) {
              toast.error(err?.message || "An unexpected error occurred.");
            } finally {
              router.refresh();
            }
          }}
          className="px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
        >
          Yes
        </button>
      </div>
    </div>
  ));
};