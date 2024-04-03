import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  //Eldönthetjük a segítségével, hogy épp editálunk-e egy formot vagy nem, ez alapján kapja majd a form a default value-kat.
  const isEditSession = Boolean(editId);

  //Add egy funkciót (Register) amely {...register("id-nek megadott érték")} hozzáadba hozzáadja az eseményeket az inputhoz.
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    //Kezdeti értéknek lehet adni a useForm hook-nak pl defaultValue-st.
    defaultValues: isEditSession ? editValues : {},
  });
  //Validate Errorokat ellehet vele kapni így megtudjuk jeleníteni.
  const { errors } = formState;
  // console.log(errors);

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
    //image a neve jsx-be is mert supbase-be is az így megtalálja.
    else
      createCabin(
        { ...data, image: image },
        //Mivel a createCabin egy aliast használó mutate function ezért itt is tudjuk hívni rá a mutate-vől jövő onSucces event-et, aminek a segítségével tudjuk hívni a reset-et.
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  //Kiírja pl mely field-ek nincsenek kitöltve amelyek requiredek voltak.
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            // || 2. ik része a hibaüzenet.
            validate: (value) =>
              // || 2. ik része a hibaüzenet. getValues megkapja az össze form elem value-ját useForm-ból származik az fgv.
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! reset-ként működik így nem submit-ként. */}
        <Button
          variation="secondary"
          type="reset"
          //Nem biztos hogy csak modal-ba használják ezlrt csak akkor hívja ha átadtuk ezt a proppot.
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
