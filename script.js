document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.getElementById('loveButton');
    const loveMessage = document.getElementById('loveMessage');
    const heartsContainer = document.querySelector('.hearts-container');
    const initialMessage = document.querySelector('.message');
    const mediaContainer = document.getElementById('mediaContainer');
    const introScreen = document.querySelector('.intro-screen');
    const contentContainer = document.querySelector('.content'); /* Referencia al contenedor de contenido */

    let clickCount = 0; // Contador de clics
    const specialMessage = "Eres mi razón de sonreír cada mañana y mi motivo para soñar cada noche. Te amo más de lo que las palabras pueden expresar"; // Mensaje especial
    let firstFiveMessagesSequence = []; // Secuencia para los primeros 5 mensajes
    let currentSequenceIndex = 0; // Índice actual en la secuencia

    // Lista de archivos de imágenes y videos en la carpeta images
    const mediaFiles = [
        'imagen106.jpg', 'imagen105.jpg', 'imagen102.jpg', 'imagen103.jpg', 'imagen101.jpg', 'imagen100.jpg', 'imagen99.jpg', 'imagen98.jpg', 'imagen97.jpg', 'imagen96.jpg', 'imagen95.jpg', 'imagen94.jpg', 'imagen93.jpg', 'imagen92.jpg', 'imagen91.jpg', 'imagen90.jpg', 'imagen87.jpg', 'imagen88.jpg', 'imagen86.jpg', 'imagen85.jpg', 'imagen84.jpg', 'imagen83.jpg', 'imagen82.jpg', 'imagen81.jpg', 'imagen80.jpg', 'imagen79.jpg', 'imagen78.jpg', 'imagen77.jpg', 'imagen76.jpg', 'imagen75.jpg', 'imagen73.jpg', 'imagen74.jpg', 'imagen72.jpg', 'imagen71.jpg', 'imagen70.jpg', 'imagen69.jpg', 'imagen67.jpg', 'imagen68.jpg', 'imagen66.jpg', 'imagen65.jpg', 'imagen89.jpg', 'imagen64.jpg', 'imagen63.jpg', 'imagen62.jpg', 'imagen61.jpg', 'imagen59.jpg', 'imagen60.jpg', 'imagen58.jpg', 'imagen57.jpg', 'imagen56.jpg', 'imagen55.jpg', 'imagen54.jpg', 'imagen53.jpg', 'imagen51.jpg', 'imagen52.jpg', 'imagen50.jpg', 'imagen49.jpg', 'imagen48.jpg', 'imagen46.jpg', 'imagen47.jpg', 'imagen45.jpg', 'imagen42.jpg', 'imagen44.jpg', 'imagen40.jpg', 'imagen43.jpg', 'imagen41.jpg', 'imagen37.jpg', 'imagen39.jpg', 'imagen38.jpg', 'imagen36.jpg', 'imagen35.jpg', 'imagen34.jpg', 'imagen31.jpg', 'imagen32.jpg', 'imagen33.jpg', 'imagen30.jpg', 'imagen29.jpg', 'imagen26.jpg', 'imagen27.jpg', 'imagen28.jpg', 'imagen24.jpg', 'imagen25.jpg', 'imagen23.jpg', 'imagen21.jpg', 'imagen22.jpg', 'imagen20.jpg', 'imagen19.jpg', 'imagen18.jpg', 'imagen16.jpg', 'imagen13.jpg', 'imagen15.jpg', 'imagen14.jpg', 'imagen11.jpg', 'imagen12.jpg', 'imagen10.jpg', 'imagen9.jpg', 'imagen8.jpg', 'imagen5.jpg', 'imagen7.jpg', 'imagen6.jpg'
    ];

    // Lista de canciones (para reproducción secuencial)
    const canciones = [
        'Musica/cancion1.mp3',
        'Musica/cancion2.mp3',
        'Musica/cancion3.mp3',
        'Musica/cancion4.mp3'
    ];

    // Lista ponderada para la selección de la primera canción
    // Agregamos cancion1.mp3 varias veces para aumentar su probabilidad
    const initialSongSelection = [
        'Musica/cancion1.mp3', // Mayor probabilidad
        'Musica/cancion1.mp3', // Mayor probabilidad
        'Musica/cancion1.mp3', // Mayor probabilidad
        'Musica/cancion2.mp3',
        'Musica/cancion3.mp3',
        'Musica/cancion4.mp3'
    ];

    // Índice actual de la canción (se usará para la reproducción secuencial)
    let currentSongIndex;

    // Función para obtener el índice de la canción inicial seleccionada en la lista 'canciones'
    function getInitialSongIndex(songPath) {
        return canciones.indexOf(songPath);
    }

    // Seleccionar una canción inicial de la lista ponderada
    const initialSongPath = initialSongSelection[Math.floor(Math.random() * initialSongSelection.length)];

    // Establecer el índice actual basado en la canción inicial seleccionada
    currentSongIndex = getInitialSongIndex(initialSongPath);

    // Duración de la animación para textos e imágenes (en milisegundos)
    const animationDuration = 400; // Reducida la duración a 0.4 segundos (400ms)

    // Función para reproducir la siguiente canción (usa la lista 'canciones' secuencial)
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % canciones.length;
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.src = canciones[currentSongIndex];
        bgMusic.play().catch(error => {
            console.error('Error al reproducir la siguiente canción:', error);
        });
    }

    // Función para mostrar un medio aleatorio con fade-in
    function displayRandomMedia() {
        const imgElement = mediaContainer.querySelector('.gallery-photo');
        // Si no hay imagen, crear una
        if (!imgElement) {
             const img = document.createElement('img');
            img.alt = 'Foto de nosotros';
            img.classList.add('gallery-photo');
            mediaContainer.appendChild(img);
            // Obtener la referencia a la imagen recién creada
            imgElement = mediaContainer.querySelector('.gallery-photo');
        }

        // Elegir un archivo aleatorio
        const randomFile = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
        const filePath = `images/${randomFile}`;

        // Determinar si es imagen o video
        if (randomFile.endsWith('.jpg') || randomFile.endsWith('.png') || randomFile.endsWith('.gif')) {
            // Aplicar animación de fade-out a la imagen actual
            imgElement.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
            imgElement.style.opacity = 0; 

            setTimeout(() => {
                // Cambiar la fuente de la imagen después de que se haya desvanecido
                imgElement.src = filePath;
                // Aplicar animación de fade-in a la nueva imagen
                imgElement.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
                imgElement.style.opacity = 1;
            }, animationDuration / 2); // Esperar la mitad de la animación para cambiar la imagen

        } else if (randomFile.endsWith('.mp4') || randomFile.endsWith('.mov') || randomFile.endsWith('.webm')) {
             // Si tienes videos, descomenta y ajusta esta sección con transiciones similares
             console.log(`Video found: ${randomFile}. Implement video handling with fade-in.`);
             // Ejemplo básico de cómo podrías manejar videos (requiere más lógica para pausar/reproducir)
            // imgElement.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
            // imgElement.style.opacity = 0;
            // setTimeout(() => {
            //     // Remover imagen y añadir video
            //     imgElement.remove();
            //     const video = document.createElement('video');
            //     video.src = filePath;
            //     video.controls = true;
            //     video.autoplay = true;
            //     video.loop = true;
            //     video.muted = true;
            //     video.classList.add('gallery-photo');
            //     mediaContainer.appendChild(video);
            //     // Aplicar fade-in al video
            //     video.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
            //     video.style.opacity = 1;
            // }, animationDuration / 2);

        } else {
            console.log(`Tipo de archivo no soportado para animación: ${randomFile}`);
        }
    }

    // Mostrar un medio aleatorio al cargar la página
    displayRandomMedia();

    // Configurar la música
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5;
        // Cargar la canción inicial seleccionada
        bgMusic.src = initialSongPath;
        bgMusic.loop = false;
        
        // Añadir eventos para depuración
        bgMusic.addEventListener('error', (e) => {
            console.error('Error al cargar el audio:', e);
            console.log('Intentando cargar:', bgMusic.src);
        });

        bgMusic.addEventListener('playing', () => {
            console.log('La música comenzó a reproducirse');
        });

        bgMusic.addEventListener('ended', () => {
            console.log('La canción terminó, reproduciendo la siguiente');
            playNextSong();
        });

        // Función para intentar reproducir la música con interacción del usuario
        const playMusicWithInteraction = async () => {
            if (bgMusic.paused) {
                try {
                    await bgMusic.play();
                    console.log('Música iniciada por interacción del usuario');
                } catch (error) {
                    console.error('Error al reproducir música con interacción:', error);
                }
            }
        };

        // Intentar reproducir automáticamente (puede ser bloqueado)
        bgMusic.play().catch(error => {
             console.log('Reproducción automática bloqueada, esperando interacción...', error);
        });

        // Reproducir la música al primer clic en cualquier parte de la página
        document.addEventListener('click', playMusicWithInteraction, { once: true });

        // También puedes intentar reproducir la música cuando la pantalla de introducción desaparece
        introScreen.addEventListener('transitionend', () => {
            if (introScreen.classList.contains('hidden')) {
                 playMusicWithInteraction();
            }
        }, { once: true });

    } else {
        console.error('No se encontró el elemento de audio con id "bgMusic"');
    }

    // Event listener para la pantalla de introducción
    introScreen.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        contentContainer.classList.add('visible'); /* Mostrar el contenido principal */
        // Opcional: Iniciar animaciones o sonidos aquí después de la introducción
    });

    // Lista de mensajes para mostrar al hacer clic en el botón
    const mensajesBotonClic = [
        "No necesito mil razones para amarte, solo una: tú.",
        "Tus abrazos son el lugar donde mi alma encuentra paz.",
        "Eres el poema más hermoso que la vida ha escrito para mí.",
        "Cada latido de mi corazón lleva tu nombre.",
        "Si pudiera detener el tiempo, lo haría en cada momento contigo.",
        "Tu sonrisa tiene el poder de curar mis días más grises.",
        "Eres mi destino favorito.",
        "Desde que llegaste, mi mundo tiene más luz.",
        "Te amo en cada silencio, en cada palabra y en cada suspiro.",
        "Eres la melodía que le da sentido a mi vida.",
        "Mi amor por ti es tan infinito como el cielo estrellado.",
        "No hay nada más hermoso que verte feliz.",
        "Si el amor tuviera rostro, sería el tuyo.",
        "Eres ese sueño del que nunca quiero despertar.",
        "Amarte es mi manera favorita de vivir.",
        "En tus ojos descubrí el universo entero.",
        "Gracias por existir y por elegir quedarte.",
        "Tu amor me transforma, me eleva y me hace mejor.",
        "En ti encontré todo lo que no sabía que buscaba.",
        "Eres magia en un mundo lleno de rutina.",
        "Tu amor me llena como ninguna otra cosa puede hacerlo.",
        "Amarte es lo más fácil que he hecho en la vida.",
        "El mejor regalo que me ha dado la vida eres tú.",
        "Eres el latido más fuerte de mi corazón.",
        "Nada me hace más feliz que caminar contigo de la mano.",
        "En tus labios encontré mi hogar.",
        "Eres esa casualidad que se volvió destino.",
        "Tu ternura me derrite el alma.",
        "Eres mi pedacito de cielo en la tierra.",
        "Contigo, cada día es poesía.",
        "Gracias por ser mi refugio y mi fuerza.",
        "Eres mi paz en medio del caos.",
        "Cada beso tuyo es un universo entero.",
        "Tus caricias son mi adicción más hermosa.",
        "En ti encontré mi lugar favorito.",
        "Mi amor por ti no conoce de tiempo ni de límites.",
        "Eres la dueña de mis pensamientos y de mi corazón.",
        "Estar contigo es la mejor parte de mi vida.",
        "Tú haces que mi mundo tenga sentido.",
        "Eres mi suspiro constante.",
        "Tus ojos me hablan sin decir una palabra.",
        "Cada día contigo es un nuevo motivo para agradecer.",
        "Eres el amor que siempre soñé.",
        "En tu sonrisa encontré la paz.",
        "Eres mi luna, mi sol y todas mis estrellas.",
        "Solo tú sabes cómo encender mi alma.",
        "Amarte es como respirar: necesario e inevitable.",
        "Cada día me enamoro más de ti.",
        "Eres el milagro más hermoso que me ha pasado.",
        "Mi corazón solo sabe latir por ti.",
        "Eres mi pensamiento favorito en todo momento.",
        "No necesito nada más, solo tú.",
        "En tus brazos encontré el paraíso.",
        "Contigo aprendí lo que es amar de verdad.",
        "Tus palabras me acarician el alma.",
        "Cada \"te amo\" tuyo vale más que mil tesoros.",
        "Tu voz es la melodía que alegra mis días.",
        "Eres mi siempre en un mundo lleno de finales.",
        "Todo en ti me invita a quedarme.",
        "Te pienso en cada canción, en cada verso, en cada silencio.",
        "No importa dónde esté, mi corazón siempre estará contigo.",
        "Eres mi historia favorita.",
        "Cada instante contigo es una eternidad feliz.",
        "Eres el sueño más hermoso que se volvió realidad.",
        "Amo tu risa, tu mirada, tu forma de ver el mundo.",
        "Si tuviera que elegir entre tú y respirar, usaría mi último aliento para decirte que te amo.",
        "Eres el latido que me despierta y la calma que me duerme.",
        "Eres lo mejor que ha pasado en mi vida.",
        "Gracias por amar mis imperfecciones.",
        "Tus besos me salvan del mundo.",
        "No importa el lugar, si estás tú, es mi hogar.",
        "Eres el abrazo que le da sentido a mis días.",
        "Tu amor me inspira a ser la mejor versión de mí.",
        "A tu lado todo tiene color.",
        "Cada día contigo es una nueva historia de amor.",
        "Eres mi princesa, mi reina, mi todo.",
        "Sin ti, mi vida no tendría la misma magia.",
        "Eres la flor más hermosa de mi jardín.",
        "Quiero amarte hoy, mañana y siempre.",
        "Eres mi destino, aunque el mundo diga lo contrario.",
        "Amarte es un privilegio que agradezco cada segundo.",
        "Tu amor es mi motor, mi impulso, mi verdad.",
        "Contigo aprendí a amar sin miedo.",
        "Eres el alma gemela que mi corazón esperaba.",
        "Tus ojos tienen la luz que guía mi camino.",
        "Cada latido mío te pertenece.",
        "Eres mi poema favorito hecho realidad.",
        "Sin ti, no soy el mismo.",
        "Eres la estrella que ilumina mis noches oscuras.",
        "Tu presencia convierte los días normales en mágicos.",
        "Eres mi mejor decisión.",
        "Gracias por ser mi sol cuando todo parece oscuro.",
        "No me canso de admirarte, de quererte, de amarte.",
        "Cada instante contigo es una bendición.",
        "Tus \"te amo\" son mi combustible diario.",
        "Eres la musa que inspira mis días.",
        "Mi amor por ti es eterno e incondicional.",
        "A tu lado descubrí que el amor verdadero existe.",
        "Te amo con el alma, con el cuerpo y con cada rincón de mi ser. Tu sonrisa es el sol que ilumina todos mis días.",
        "A tu lado, la vida tiene otro sabor, otro color, otro sentido.",
        "Eres la melodía más dulce en mi canción favorita.",
        "Cada latido de mi corazón lleva tu nombre.",
        "No necesito un paraíso, solo necesito estar contigo.",
        "Tus ojos tienen la magia de calmar mis tormentas.",
        "Eres mi lugar seguro en este mundo caótico.",
        "En tu abrazo encontré mi hogar.",
        "Contigo aprendí que el amor verdadero existe.",
        "Eres el sueño del que nunca quiero despertar.",
        "No hay día que no agradezca al destino por ti.",
        "Eres la razón por la que creo en la eternidad.",
        "Te amo en cada suspiro, en cada silencio, en cada mirada.",
        "Eres poesía hecha persona.",
        "Desde que llegaste, todo tiene sentido.",
        "Eres mi paz en medio del ruido.",
        "A tu lado aprendí que amar es también volar.",
        "Eres mi canción favorita en bucle.",
        "Eres el detalle más hermoso de mi vida.",
        "Con cada beso tuyo, el universo cobra sentido.",
        "Eres mi amor en todas sus formas.",
        "Tus abrazos son mi armadura y mi refugio.",
        "Si tú estás bien, todo en mí está completo.",
        "Te amo sin prisa, pero sin pausas.",
        "Eres la casualidad más hermosa que llegó a mi vida.",
        "Cada día contigo es una nueva aventura de amor.",
        "Tu amor me da fuerza incluso en mis días más grises.",
        "Te pienso con el alma y te siento con el corazón.",
        "Tus palabras me abrazan más que mil brazos.",
        "Eres mi mejor coincidencia.",
        "A tu lado, el tiempo vuela pero deja huella.",
        "No necesito un cuento de hadas, te tengo a ti.",
        "Eres la sonrisa que se asoma incluso en mis días tristes.",
        "Amarte es lo más natural que me ha pasado.",
        "Eres la razón por la que mi corazón late con alegría.",
        "Cada momento contigo es eterno en mi memoria.",
        "Eres mi inspiración diaria.",
        "Tu amor me transforma, me eleva, me completa.",
        "Contigo aprendí que amar es también cuidar.",
        "Eres la respuesta a todas mis preguntas.",
        "Eres el deseo que no cambia con el tiempo.",
        "Eres la flor que embellece mi jardín interior.",
        "A tu lado no existen los días malos.",
        "Amarte es como respirar, inevitable.",
        "Tu amor es el motor que impulsa mi alma.",
        "Eres la calma en medio del huracán.",
        "Cada mirada tuya es un poema sin palabras.",
        "Tu existencia hace que todo valga la pena.",
        "Eres mi lugar favorito para descansar.",
        "Te amo más allá del espacio y el tiempo.",
        "En tus ojos me pierdo para encontrarme.",
        "Contigo aprendí a soñar despierto.",
        "Eres mi más bella realidad.",
        "Tus besos tienen el poder de sanar.",
        "Cada día contigo es una bendición.",
        "Eres la magia que da sentido a mi vida.",
        "Te pienso en los silencios más profundos.",
        "Eres el sol de mis días nublados.",
        "Eres arte, eres luz, eres amor.",
        "Mi amor por ti no conoce fronteras.",
        "Te llevaría al fin del mundo si es contigo.",
        "Tus gestos me enamoran cada día más.",
        "Eres el milagro más hermoso que me ha tocado vivir.",
        "Te amo en cada parte de mi ser.",
        "A tu lado, la vida es más dulce.",
        "Eres el regalo que la vida me dio sin pedirlo.",
        "No hay nada más bonito que compartir la vida contigo.",
        "Eres mi siempre en un mundo de incertidumbre.",
        "Tu amor me da alas sin necesidad de volar.",
        "Eres la razón por la que todo mejora.",
        "Cada palabra tuya es música para mi alma.",
        "Eres mi destino favorito.",
        "Si te tengo a ti, no necesito nada más.",
        "Tu presencia en mi vida es un poema eterno.",
        "Eres mi historia favorita contada por el universo.",
        "Te amo incluso en los espacios que no compartimos.",
        "Tu alma brilla y la mía se enciende con ella.",
        "Eres todo lo que un día soñé.",
        "A tu lado, los días tienen sentido.",
        "Eres la brisa suave que acaricia mi alma.",
        "Amarte es mi forma de agradecer por existir.",
        "En ti descubrí lo que es amar con el alma.",
        "Tu amor me hace mejor persona.",
        "Eres el suspiro que me recuerda que estoy vivo.",
        "No hay noche que no sueñe contigo.",
        "Tu voz es mi melodía favorita.",
        "A tu lado todo florece.",
        "Eres el reflejo de mis mejores pensamientos.",
        "Eres mi ternura infinita.",
        "Mi corazón late solo para ti.",
        "Si el amor tiene un nombre, ese es el tuyo.",
        "Eres el amanecer de mis días más oscuros.",
        "En tu mirada encontré mi paz.",
        "Cada beso tuyo tiene sabor a eternidad.",
        "Amarte es la mejor parte de mi vida.",
        "Tus abrazos son mi lugar favorito.",
        "No hay nada más hermoso que tú en mi vida.",
        "Eres la historia que quiero escribir cada día.",
        "Tu amor es el fuego que me mantiene vivo.",
        "Eres mi poesía diaria. Eres mi pensamiento favorito a cualquier hora.",
        "No hay un solo día en que no agradezca tenerte.",
        "Cada parte de mí sonríe cuando te pienso.",
        "Eres la luz que guía mis pasos.",
        "Si tuviera que volver a elegir, te elegiría a ti mil veces.",
        "Eres la luna que ilumina mis noches más oscuras.",
        "A tu lado, cada momento es eterno.",
        "Tu amor me enseñó a amar de verdad.",
        "Eres la pieza que le faltaba a mi rompecabezas.",
        "En tus labios encontré mi paz.",
        "Eres mi alegría constante.",
        "Cada caricia tuya sana mis heridas.",
        "No hay amor más puro que el que siento por ti.",
        "Eres mi norte, mi guía, mi amor.",
        "Tu ternura me desarma todos los días.",
        "A tu lado descubrí que el amor no duele, sana.",
        "Eres mi \"todo va a estar bien\".",
        "Si la vida es un viaje, quiero recorrerla contigo.",
        "Tu amor es mi mejor refugio.",
        "Eres la estrella que siempre busqué en el cielo.",
        "Te amo con la certeza de quien encontró su lugar.",
        "En tus ojos caben todos mis sueños.",
        "Eres la parte más bonita de mi historia.",
        "El tiempo contigo siempre es poco.",
        "Te amo como el mar ama la orilla: eternamente.",
        "Mi alma sonríe cuando estás cerca.",
        "Contigo, hasta el silencio es perfecto.",
        "Eres mi mejor pensamiento.",
        "Cada día contigo es una página más en mi historia favorita.",
        "Eres la razón por la que mi corazón escribe versos.",
        "Te amo sin lógica, sin medida, sin final.",
        "Tu risa es mi melodía preferida.",
        "Eres el abrazo que quiero cuando todo va mal.",
        "A tu lado, hasta los días grises tienen colores.",
        "Eres lo más bonito que me ha pasado.",
        "Tu voz tiene el poder de calmar todas mis tormentas.",
        "Eres la razón por la que sonrío sin motivo.",
        "Si te sueño, no quiero despertar.",
        "Eres el deseo que pido cada vez que veo una estrella fugaz.",
        "Contigo, la vida sabe mejor.",
        "Te amo más que ayer y menos que mañana.",
        "Mi hogar no es un lugar, es un abrazo tuyo.",
        "Tus besos tienen sabor a eternidad.",
        "Eres la nota más dulce de mi sinfonía.",
        "Cuando te miro, todo se detiene.",
        "Te amo en cada detalle, en cada espacio, en cada momento.",
        "Mi amor por ti no tiene pausa.",
        "Eres la canción que quiero que suene toda la vida.",
        "Amarte es como respirar: vital.",
        "Eres el color en mis días en blanco y negro.",
        "Tu amor es el poema más hermoso jamás escrito.",
        "Contigo todo cobra sentido.",
        "Tu presencia llena de luz mi existencia.",
        "Eres el regalo que no pedí pero siempre soñé.",
        "Tus ojos tienen la profundidad del universo.",
        "Cada minuto contigo es una eternidad que vale la pena.",
        "Eres el suspiro que se escapa cuando mi corazón te recuerda.",
        "Te amo sin mapas ni coordenadas, solo con el alma.",
        "Tu sonrisa es la chispa que enciende mi alegría.",
        "Eres el final feliz que siempre imaginé.",
        "Tu nombre está escrito en mi corazón.",
        "Eres mi rincón favorito del mundo.",
        "Tus manos tienen el poder de calmar mis ansiedades.",
        "Eres mi verdad en un mundo lleno de dudas.",
        "Tu amor me completa de formas que no sabía que existían.",
        "Eres la calma que necesitaba mi caos.",
        "Cada paso a tu lado es un paso hacia la felicidad.",
        "Eres el aire que llena mis pulmones de amor.",
        "Nada tiene sentido sin ti.",
        "Te amo de la forma más pura que existe.",
        "Eres mi sol incluso en los días más nublados.",
        "Tu dulzura me envuelve como una canción suave.",
        "Eres la respuesta a todas mis preguntas.",
        "En ti encontré la eternidad que buscaba.",
        "Mi amor por ti es tan grande como el universo.",
        "Tu piel es mi lugar favorito.",
        "Contigo, cada historia tiene final feliz.",
        "Eres el \"te amo\" más sincero que he dicho.",
        "Te amo con todas mis fuerzas y más allá.",
        "Eres el tesoro más valioso de mi vida.",
        "A tu lado, el tiempo vuela, pero el amor permanece.",
        "Eres la canción que repito una y otra vez en mi corazón.",
        "En tu risa encontré la melodía perfecta.",
        "Eres todo lo que siempre soñé y más.",
        "Te amo con locura, ternura y pasión.",
        "Eres la historia de amor que quiero contar por siempre.",
        "Tu mirada me hace olvidar el resto del mundo.",
        "Eres el refugio de mi alma.",
        "Te amo más allá de lo imaginable.",
        "Eres la chispa que encendió mi vida.",
        "Si tuviera que elegir de nuevo, te volvería a elegir a ti.",
        "Eres la promesa que quiero cumplir todos los días.",
        "Tu amor es mi motor, mi energía, mi todo.",
        "Eres el principio y el fin de todos mis poemas.",
        "A tu lado, todo es posible.",
        "Eres la melodía más dulce en mi sinfonía de vida.",
        "Tu amor es el milagro que transforma mis días.",
        "Eres mi todo en esta vida.",
        "Cada segundo contigo vale más que mil sin ti.",
        "Te amo más de lo que los versos pueden decir."
    ];

    // Mostrar mensaje inicial fijo al cargar la página
    initialMessage.textContent = mensajesBotonClic[Math.floor(Math.random() * mensajesBotonClic.length)];

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

    // Función para generar la secuencia inicial de 5 mensajes
    function generateFirstFiveMessagesSequence(messagesList, specialMsg) {
        const sequence = [];
        const tempMessages = [...messagesList]; // Copia de la lista para no modificar la original

        // Asegurarse de que el mensaje especial esté en la lista temporal
        if (!tempMessages.includes(specialMsg)) {
            tempMessages.push(specialMsg);
        }

        // Eliminar el mensaje especial temporalmente para seleccionarlo por separado
        const specialMsgIndex = tempMessages.indexOf(specialMsg);
        const removedSpecialMsg = tempMessages.splice(specialMsgIndex, 1)[0];

        // Seleccionar 4 mensajes aleatorios del resto de la lista
        for (let i = 0; i < 4; i++) {
            if (tempMessages.length > 0) {
                const randomIndex = Math.floor(Math.random() * tempMessages.length);
                sequence.push(tempMessages.splice(randomIndex, 1)[0]);
            } else {
                // Si no hay suficientes mensajes, repetir otros
                sequence.push("Otro mensaje bonito."); 
            }
        }

        // Insertar el mensaje especial en una posición aleatoria dentro de los 5
        const randomPosition = Math.floor(Math.random() * 5);
        sequence.splice(randomPosition, 0, removedSpecialMsg);

        return sequence;
    }

    // Generar la secuencia al cargar la página
    firstFiveMessagesSequence = generateFirstFiveMessagesSequence(mensajesBotonClic, specialMessage);

    // Manejar el clic en el botón
    loveButton.addEventListener('click', () => {
        // Mostrar mensaje con animación (de la aparición del loveMessage)
        loveMessage.classList.remove('hidden');
        setTimeout(() => {
            loveMessage.classList.add('visible');
        }, 100); // Este timeout es para la visibilidad general del contenedor, no del texto

        // Generar y mostrar una frase romántica aleatoria en el loveMessage
        const randomLoveMessage = generarFraseRomantica();
        const loveMessageText = loveMessage.querySelector('p');

        // Aplicar animación de fade-out al texto actual antes de cambiarlo
        loveMessageText.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
        loveMessageText.style.opacity = 0; 

        setTimeout(() => {
            // Cambiar el texto después de que se haya desvanecido (o casi)
            loveMessageText.innerHTML = randomLoveMessage;
            // Aplicar animación de fade-in al nuevo texto
            loveMessageText.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
            loveMessageText.style.opacity = 1;
        }, animationDuration / 2); // Esperar la mitad de la animación para cambiar el texto

        // CAMBIAR EL TEXTO DEL MENSAJE INICIAL (initialMessage)
        if (mensajesBotonClic.length > 0) {
            let messageToDisplay;
            clickCount++; // Incrementar el contador de clics

            if (clickCount <= 5) {
                // Usar el mensaje de la secuencia para los primeros 5 clics
                messageToDisplay = firstFiveMessagesSequence[currentSequenceIndex];
                currentSequenceIndex++; // Mover al siguiente índice en la secuencia
            } else {
                 // Volver a la selección aleatoria de toda la lista
                const allMessages = [...mensajesBotonClic];
                 // Asegurarse de que el mensaje especial esté en la lista para la selección aleatoria general
                 if (!allMessages.includes(specialMessage)) {
                     allMessages.push(specialMessage);
                 }
                messageToDisplay = allMessages[Math.floor(Math.random() * allMessages.length)];
            }
            
            // Aplicar animación de fade-out al texto actual antes de cambiarlo
            initialMessage.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
            initialMessage.style.opacity = 0; 

            setTimeout(() => {
                 // Cambiar el texto después de que se haya desvanecido (o casi)
                initialMessage.textContent = messageToDisplay;
                // Aplicar animación de fade-in al nuevo texto
                initialMessage.style.transition = `opacity ${animationDuration / 2}ms ease-in-out`;
                initialMessage.style.opacity = 1;
            }, animationDuration / 2); // Esperar la mitad de la animación para cambiar el texto
        }

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