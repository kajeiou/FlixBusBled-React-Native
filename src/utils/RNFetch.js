import RNFetchBlob from 'rn-fetch-blob';

// Fonction pour télécharger un fichier à partir d'une URI et le téléverser sur Firebase Storage
const uploadBytesFromURI = async (ref, uri) => {
  try {
    // Télécharger le fichier à partir de l'URI
    let response;
    try {
      console.log('Téléchargement du fichier en cours depuis l\'URI :', uri);
      response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', uri);
      console.log('Fichier téléchargé avec succès.');
    } catch (downloadError) {
      console.error('Erreur A1 lors du téléchargement du fichier :', downloadError);
      throw new Error('Erreur lors du téléchargement du fichier : ' + downloadError.message);
    }
    
    // Obtenir le chemin local du fichier téléchargé
    const filePath = response.path();
    console.log('Chemin local du fichier téléchargé :', filePath);
    
    // Lire les données binaires du fichier
    let data;
    try {
      console.log('Lecture des données binaires du fichier...');
      data = await RNFetchBlob.fs.readFile(filePath, 'base64');
      console.log('Données binaires du fichier lues avec succès.');
    } catch (readError) {
      console.error('Erreur A2 lors de la lecture des données binaires du fichier :', readError);
      throw new Error('Erreur lors de la lecture des données binaires du fichier : ' + readError.message);
    }

    // Téléverser les données binaires sur Firebase Storage
    try {
      console.log('Téléversement des données binaires sur Firebase Storage...');
      await ref.put(data, { contentType: 'image/jpeg' });
      console.log('Données binaires téléversées avec succès sur Firebase Storage.');
    } catch (uploadError) {
      console.error('Erreur B lors du téléversement des données binaires sur Firebase Storage :', uploadError);
      throw new Error('Erreur lors du téléversement des données binaires sur Firebase Storage : ' + uploadError.message);
    }

    // Supprimer le fichier local temporaire
    try {
      console.log('Suppression du fichier local temporaire...');
      await RNFetchBlob.fs.unlink(filePath);
      console.log('Fichier local temporaire supprimé avec succès.');
    } catch (deleteError) {
      console.error('Erreur C lors de la suppression du fichier local temporaire :', deleteError);
      throw new Error('Erreur lors de la suppression du fichier local temporaire : ' + deleteError.message);
    }

    // Retourner le résultat si nécessaire
    return true;
  } catch (error) {
    console.error('Erreur D lors du téléchargement et de l\'upload du fichier :', error);
    throw error;
  }
};
const downloadAndSaveImage = async (imageUrl, fileName) => {
  try {
    const response = await RNFetchBlob.fetch('GET', imageUrl);
    const imagePath = `${RNFetchBlob.fs.dirs.CacheDir}/${fileName}`;
    await RNFetchBlob.fs.writeFile(imagePath, response.data, 'base64');
    console.log('Chemin de l\'image sauvegardée :', imagePath);
    return imagePath;
  } catch (error) {
    console.error('Erreur lors du téléchargement et de la sauvegarde de l\'image :', error);
    throw error;
  }
};


export default {uploadBytesFromURI, downloadAndSaveImage};
