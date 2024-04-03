import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    // ugyanaz mivel itt így adjuk át () = mutate(cabinId) -Closure miatt ismeri.
    mutationFn: deleteCabinApi,
    //Ha a mutation sikeres (Töröltünk) akkor játszódik le. -> Invalidate-elni kell a Cache-t hogy újra kérje le, amit a queryclien-be tehetünk (Ez alapjáraton a App.jsx-be van)
    //Rögtön törli az UI-ról is hiszen újra renderelődik a komponens.
    onSuccess: () => {
      toast.success("Cabin succesfully deleted");
      //Invalidálja a Cache-ben a megadott query-ket.
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    //Ha valamiért nem sikerül a művelet ez fut le.
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
