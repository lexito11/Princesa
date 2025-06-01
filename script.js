document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.getElementById('loveButton');
    const loveMessage = document.getElementById('loveMessage');
    const heartsContainer = document.querySelector('.hearts-container');
    const initialMessage = document.querySelector('.message');
    const mediaContainer = document.getElementById('mediaContainer');
    const introScreen = document.querySelector('.intro-screen');
    const contentContainer = document.querySelector('.content'); /* Referencia al contenedor de contenido */

    // Lista de archivos de imágenes y videos en la carpeta images
    const mediaFiles = [
        'imagen106.jpg', 'imagen105.jpg', 'imagen102.jpg', 'imagen103.jpg', 'imagen101.jpg', 'imagen100.jpg', 'imagen99.jpg', 'imagen98.jpg', 'imagen97.jpg', 'imagen96.jpg', 'imagen95.jpg', 'imagen94.jpg', 'imagen93.jpg', 'imagen92.jpg', 'imagen91.jpg', 'imagen90.jpg', 'imagen87.jpg', 'imagen88.jpg', 'imagen86.jpg', 'imagen85.jpg', 'imagen84.jpg', 'imagen83.jpg', 'imagen82.jpg', 'imagen81.jpg', 'imagen80.jpg', 'imagen79.jpg', 'imagen78.jpg', 'imagen77.jpg', 'imagen76.jpg', 'imagen75.jpg', 'imagen73.jpg', 'imagen74.jpg', 'imagen72.jpg', 'imagen71.jpg', 'imagen70.jpg', 'imagen69.jpg', 'imagen67.jpg', 'imagen68.jpg', 'imagen66.jpg', 'imagen65.jpg', 'imagen89.jpg', 'imagen64.jpg', 'imagen63.jpg', 'imagen62.jpg', 'imagen61.jpg', 'imagen59.jpg', 'imagen60.jpg', 'imagen58.jpg', 'imagen57.jpg', 'imagen56.jpg', 'imagen55.jpg', 'imagen54.jpg', 'imagen53.jpg', 'imagen51.jpg', 'imagen52.jpg', 'imagen50.jpg', 'imagen49.jpg', 'imagen48.jpg', 'imagen46.jpg', 'imagen47.jpg', 'imagen45.jpg', 'imagen42.jpg', 'imagen44.jpg', 'imagen40.jpg', 'imagen43.jpg', 'imagen41.jpg', 'imagen37.jpg', 'imagen39.jpg', 'imagen38.jpg', 'imagen36.jpg', 'imagen35.jpg', 'imagen34.jpg', 'imagen31.jpg', 'imagen32.jpg', 'imagen33.jpg', 'imagen30.jpg', 'imagen29.jpg', 'imagen26.jpg', 'imagen27.jpg', 'imagen28.jpg', 'imagen24.jpg', 'imagen25.jpg', 'imagen23.jpg', 'imagen21.jpg', 'imagen22.jpg', 'imagen20.jpg', 'imagen19.jpg', 'imagen18.jpg', 'imagen16.jpg', 'imagen13.jpg', 'imagen15.jpg', 'imagen14.jpg', 'imagen11.jpg', 'imagen12.jpg', 'imagen10.jpg', 'imagen9.jpg', 'imagen8.jpg', 'imagen5.jpg', 'imagen7.jpg', 'imagen6.jpg'
    ];

    // Función para mostrar un medio aleatorio
    function displayRandomMedia() {
        // Limpiar contenedor actual
        mediaContainer.innerHTML = '';

        // Elegir un archivo aleatorio
        const randomFile = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
        const filePath = `images/${randomFile}`;

        // Determinar si es imagen o video (asumimos .jpg es imagen por ahora)
        if (randomFile.endsWith('.jpg') || randomFile.endsWith('.png') || randomFile.endsWith('.gif')) {
            const img = document.createElement('img');
            img.src = filePath;
            img.alt = 'Foto de nosotros';
            img.classList.add('gallery-photo');
            mediaContainer.appendChild(img);
        } else if (randomFile.endsWith('.mp4') || randomFile.endsWith('.mov') || randomFile.endsWith('.webm')) {
             // Si tienes videos, descomenta y ajusta esta sección
            // const video = document.createElement('video');
            // video.src = filePath;
            // video.controls = true; // Opcional: mostrar controles de video
            // video.autoplay = true; // Opcional: reproducir automáticamente
            // video.loop = true; // Opcional: reproducir en bucle
            // video.muted = true; // Opcional: silenciar por defecto (recomendado para autoplay)
            // video.classList.add('gallery-photo'); // Reusa la clase para el estilo
            // mediaContainer.appendChild(video);
             console.log(`Video found: ${randomFile}. Uncomment video handling code to display.`);
        } else {
            console.log(`Tipo de archivo no soportado: ${randomFile}`);
        }
    }

    // Mostrar un medio aleatorio al cargar la página
    displayRandomMedia();

    // Event listener para la pantalla de introducción
    introScreen.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        contentContainer.classList.add('visible'); /* Mostrar el contenido principal */
        // Opcional: Iniciar animaciones o sonidos aquí después de la introducción
        
        // Reproducir música de fondo
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.5; // Controla el volumen (0.0 a 1.0)
            bgMusic.play().catch(() => {
                // Si la reproducción falla (por ejemplo, por bloqueo de autoplay)
                console.log('La reproducción automática de audio fue bloqueada.');
                // Opcional: Mostrar un botón para que el usuario inicie la música manualmente
                const playButton = document.createElement('button');
                playButton.textContent = 'Reproducir música';
                // Añade estilos básicos al botón si no quieres que se vea feo
                playButton.style.position = 'fixed';
                playButton.style.bottom = '20px';
                playButton.style.left = '50%';
                playButton.style.transform = 'translateX(-50%)';
                playButton.style.zIndex = '2001'; // Asegura que esté por encima de todo
                playButton.style.padding = '10px 20px';
                playButton.style.backgroundColor = '#ff4b4b';
                playButton.style.color = 'white';
                playButton.style.border = 'none';
                playButton.style.borderRadius = '5px';
                playButton.style.cursor = 'pointer';

                playButton.onclick = () => {
                    bgMusic.play();
                    playButton.remove(); // Ocultar el botón una vez que se reproduce
                };
                document.body.appendChild(playButton);
            });
        }
    });

    // Mensajes iniciales
    const mensajesIniciales = [
        "Cada momento a tu lado es un regalo. Tu sonrisa ilumina mis días y tu amor hace que mi corazón dance de felicidad. Eres mi todo.",
        "Tu amor es el mejor regalo que la vida me ha dado. Cada día a tu lado es una nueva aventura de felicidad.",
        "Eres mi razón de sonreír cada mañana y mi motivo para soñar cada noche. Te amo más de lo que las palabras pueden expresar.",
        "Contigo cada día es especial. Tu amor hace que mi mundo sea más hermoso y mi vida más completa.",
        "Eres mi mejor amiga, mi confidente, mi amor. Contigo todo tiene más sentido y cada momento es más especial."
    ];

    // Mostrar mensaje inicial aleatorio
    initialMessage.textContent = mensajesIniciales[Math.floor(Math.random() * mensajesIniciales.length)];

    // Adjetivos que describen a una persona
    const adjetivos = [
        "amor eterno", "amor infinito", "amor puro", "amor sincero", 
        "amor profundo", "amor intenso", "amor apasionado", "amor romántico", 
        "amor tierno", "amor dulce", "amor hermoso", "amor perfecto", "amor único", 
        "amor especial", "amor maravilloso", "amor mágico", "amor soñado", "amor fiel", 
        "amor leal", "amor constante", "amor fuerte", "amor incondicional", "amor completo", 
        "amor espontáneo", "amor sincero", "amor honesto", "amor puro", "amor limpio",
        "amor seguro", "amor confiable", "amor verdadero"
    ];

    // Sustantivos bonitos que alguien puede ser
    const sustantivos = [
        // Elementos naturales y celestiales
        "sol", "luna", "estrella", "cielo", "brisa favorita", "arcoíris de colores",
        // Joyas y tesoros
        "tesoro", "joya", "perla", "diamante", "rubí", "esmeralda", "zafiro",
        // Títulos y roles
        "princesa", "reina", "ángel", "alma gemela",
        // Elementos artísticos y creativos
        "poesía", "arte de parte de Dios", "belleza", "encanto", "verso más bonito", "canción favorita", "melodía más hermosa",
        // Emociones y sentimientos
        "alegría", "esperanza", "paz", "dulzura", "ternura", "pasión", "amor", "ilusión", "fantasía", "energía",
        // Conceptos abstractos
        "sueño más bonito", "razón de seguir", "inspiración", "universo",
        "mayor admiración", "mayor aprecio", "mayor cuidado", "mayor protección",
        "mayor confianza", "milagro", "aventura favorita",
        // Elementos de relación
        "mejor compañera", "mejor amiga", "abrazo más tierno", "caricia más dulce", "mirada enamorada",
        // Lugares y refugios
        "paraíso favorito", "hogar", "refugio",
        // Regalos y bendiciones
        "regalo de Dios", "bendición", "luz maravillosa", "vida"
    ];

    function generarFraseRomantica() {
        const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
        const sustantivo = sustantivos[Math.floor(Math.random() * sustantivos.length)];
        // 50% de probabilidad de usar solo el sustantivo
        const roseSpan = '<span class="no-border-emoji">🌹</span>';
        if (Math.random() < 0.5) {
            return `Eres mi ${sustantivo} ${roseSpan}`;
        } else {
            return `Eres mi ${adjetivo} ${roseSpan}`;
        }
    }

    // Función para crear corazones flotantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        // Elegir aleatoriamente entre SVG corazón rojo (forma emoji), emojis y rosa
        const svgHeart = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="#ff2a2a" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        const floatingElements = [svgHeart, '❣️', '❤️', '🌹']; // Añadido el emoji de rosa
        heart.innerHTML = floatingElements[Math.floor(Math.random() * floatingElements.length)];
        // Tamaños aleatorios para los corazones
        const sizes = ['1.5em', '2em', '2.5em', '3em', '4em', '5em'];
        heart.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
        // Posición inicial aleatoria
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = Math.random() * 20 - 20 + 'vh';
        // Velocidad y duración aleatoria
        const duration = Math.random() * 3 + 3; // Entre 3 y 6 segundos (antes era 4-8)
        heart.style.animationDuration = duration + 's';
        
        // Rotación aleatoria
        const rotation = Math.random() * 360;
        heart.style.transform = `rotate(${rotation}deg)`;
        
        heartsContainer.appendChild(heart);

        // Eliminar el corazón después de la animación
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Crear corazones cada cierto tiempo
    setInterval(createHeart, 150); // Crear un corazón cada 150ms (antes era 200ms)

    // Manejar el clic en el botón
    loveButton.addEventListener('click', () => {
        // Mostrar mensaje con animación
        loveMessage.classList.remove('hidden');
        setTimeout(() => {
            loveMessage.classList.add('visible');
        }, 100);

        // Generar y mostrar una frase romántica aleatoria
        const randomMessage = generarFraseRomantica();
        loveMessage.querySelector('p').innerHTML = randomMessage;

        // Crear una explosión de corazones al hacer clic
        for (let i = 0; i < 20; i++) { // Aumentado de 10 a 20 corazones
            setTimeout(() => {
                createHeart();
            }, i * 50); // Reducido el intervalo entre corazones
        }

        // Mostrar una imagen/video aleatorio de la galería
        displayRandomMedia();
    });
}); 