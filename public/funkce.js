// Spuštění JavaScriptu po načtení DOM
document.addEventListener("DOMContentLoaded", () => {
    const blueButton = document.querySelector('.blue-button'); // Tlačítko Modrá
    const redButton = document.querySelector('.red-button');   // Tlačítko Červená

    // Funkce pro změnu motivu na modrý
    const setBlueTheme = () => {
        document.body.style.background = 'linear-gradient(135deg, #339fe7, #0f4cd0)';
        document.body.style.color = '#ffffff';

        const title = document.querySelector('h1');
        title.style.background = 'linear-gradient(45deg, #00e5ff, #38ebff, #41ffec, #00fffb, #00d4e8)';
        title.style.webkitTextFillColor = 'transparent';
        title.style.backgroundClip = 'text';
        title.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.1)';

        const playButton = document.querySelector('.play-button');
        playButton.style.color = 'rgb(0, 30, 255)';
        playButton.style.backgroundColor = '#8de6d2';
        playButton.style.borderColor = '#8de6d2';
    };

    // Funkce pro změnu motivu na červený
    const setRedTheme = () => {
        document.body.style.background = 'linear-gradient(135deg, #ff4e4e, #d00000)';
        document.body.style.color = '#ffffff';

        const title = document.querySelector('h1');
        title.style.background = 'linear-gradient(45deg, #ff7575, #ff9999,rgb(255, 129, 129),rgb(255, 171, 171),rgb(255, 124, 124))';
        title.style.webkitTextFillColor = 'transparent';
        title.style.backgroundClip = 'text';
        title.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.1)';

        const playButton = document.querySelector('.play-button');
        playButton.style.color = 'rgb(255, 30, 30)';
        playButton.style.backgroundColor = '#ffa3a3';
        playButton.style.borderColor = '#ffa3a3';
    };

    // Kliknutí na tlačítko Modrá
    blueButton.addEventListener('click', setBlueTheme);

    // Kliknutí na tlačítko Červená
    redButton.addEventListener('click', setRedTheme);

    // Nastavení výchozího motivu (modrého)
    setBlueTheme();
});
