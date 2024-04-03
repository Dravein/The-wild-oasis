import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    // ugyanaz mivel itt így adjuk át () = mutate(cabinId) -Closure miatt ismeri.
    mutationFn: deleteBookingApi,
    //Ha a mutation sikeres (Töröltünk) akkor játszódik le. -> Invalidate-elni kell a Cache-t hogy újra kérje le, amit a queryclien-be tehetünk (Ez alapjáraton a App.jsx-be van)
    //Rögtön törli az UI-ról is hiszen újra renderelődik a komponens.
    onSuccess: () => {
      toast.success("Booking succesfully deleted");
      //Invalidálja a Cache-ben a megadott query-ket.
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    //Ha valamiért nem sikerül a művelet ez fut le.
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
