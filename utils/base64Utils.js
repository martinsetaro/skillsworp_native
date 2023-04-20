import * as FileSystem from "expo-file-system";

export async function fileToBase64(uri) {
  try {
    const options = { encoding: "base64" };
    const base64Image = await FileSystem.readAsStringAsync(uri, {encoding:'base64'});

    return base64Image;
  } catch (e) {
    console.error(e);
  }
}


