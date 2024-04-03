import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //Ha supabase URL-el kezdődik a image akkor van Path vagyis van már kép a supabase storage-ba.
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // .replaceAll( "/", "") kell mert ha van / a névben az alapján a supabase új foldert hozna létre.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://sarshtdtbwtttyapakxp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg ezt rakuk össze a 2 változóból.
  const imagePath = hasImagePath
    ? //Ha van ilyen imgae, akkor ne csináljon újat ha nem már használja a meglévőt.
      newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/Edit Cabin
  //Query-t csinálunk
  let query = supabase.from("cabins");

  //A CREATE
  if (!id)
    query = query
      // .insert([{ some_column: "someValue", other_column: "otherValue" }])
      //Azért működik így is mert ugyanazok a neve a form-ba mint a adatbázisba.
      .insert([{ ...newCabin, image: imagePath }]);

  //B EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //Hozzá kell csatolni a selectet, singlet ez miatt tér vissza a data-ba a függvény hogy feltudjuk használni rögtön, ennélkül csak beleteszi a Database-be
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //Image Nevét, és Pathot és specifikálni kell magán a képen kívül hogy feltudjuk tölteni a képet.
  //2. Upload the image.

  //Ha létezik nem csináljon új image-t a storage-ba.
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3- Delete the cabin if there was an error uploading image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
