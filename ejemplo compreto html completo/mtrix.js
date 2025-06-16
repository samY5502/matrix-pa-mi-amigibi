let matrixColor = "#0F0"; // Color inicial: verde Matrix
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres estilo Matrix (letras, números y símbolos)
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|?!";
const specialWords = ["TQM", "GRACIAS", "AMIGIBI"]; // Palabras personalizadas
const fontSize = 16;
const columns = canvas.width / fontSize;

// Posición inicial de cada columna
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  // Fondo negro con leve opacidad para efecto de arrastre
  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

 ctx.fillStyle = matrixColor; // Usamos el color dinámico
  ctx.font = `${fontSize}px monospace`
  // Dibujar los textos flotantes del clic
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const txt = floatingTexts[i];
    ctx.fillStyle = `rgba(255, 255, 255, ${txt.opacity})`;
    ctx.font = "20px monospace";
    ctx.fillText(txt.text, txt.x, txt.y);

    txt.y -= 0.7;
    txt.opacity -= 0.015;

    if (txt.opacity <= 0) {
      floatingTexts.splice(i, 1); // Eliminar texto cuando desaparece
    }
  };

  for (let i = 0; i < drops.length; i++) {
    // A veces muestra una palabra especial, otras un caracter aleatorio
    let text = Math.random() < 0.005 
      ? specialWords[Math.floor(Math.random() * specialWords.length)] 
      : matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));

    // Si es palabra especial, mostrar toda la palabra
    if (specialWords.includes(text)) {
      for (let j = 0; j < text.length; j++) {
        ctx.fillText(text[j], i * fontSize, (drops[i] + j) * fontSize);
      }
      drops[i] += text.length + 1;
    } else {
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
    }

    // Reiniciar gota al azar si llega al final
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }
}

setInterval(drawMatrix, 50);

// Ajustar canvas al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// Lista de mensajes que se mostrarán al hacer clic
const clickMessages = ["TQM", "GRACIAS POR TOO", "T APRECIO", "AMIGIBI"];
let floatingTexts = [];

// Escuchar clics y toques
document.addEventListener("click", handleClick);
document.addEventListener("touchstart", handleClick);

function handleClick(event)

{
  matrixColor = "#FF0"; // Cambia el color a amarillo (o el que prefieras)
  const x = event.clientX || event.touches[0].clientX;
  const y = event.clientY || event.touches[0].clientY;

  clickMessages.forEach((msg, index) => {
    floatingTexts.push({
      text: msg,
      x: x + Math.random() * 30 - 15,
      y: y + index * 20,
      opacity: 1,
      lifespan: 60
    });
  });
}