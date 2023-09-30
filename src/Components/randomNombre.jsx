const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
};
  
export default function generateRandomNombre() {
    let nombre = generateRandomLetter().toUpperCase(); // Primera letra en mayúscula
    for (let i = 1; i < 6; i++) {
        nombre += generateRandomLetter();
    }
    return nombre
};