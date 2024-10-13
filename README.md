# AI-Generated Comedy Show

This project allows users to create customized comedy shows using AI-generated content. Users can personalize their comedy experience by choosing the theme, targeted audience, duration, characters, and humor style, then generate a unique comedy show based on these parameters.

## Features

- **Theme Selection**: Users can choose from different themes for the comedy show (Standup, Sketch, Roast, Musical).
- **Audience Selection**: Different age groups like Everyone, Kids, Teens, Adults, and Seniors.
- **Customizable Duration**: Various lengths from 3 minutes to 30 minutes.
- **Character Creation**: Users can create characters for their comedy show.
- **Prompt Input**: A user-defined prompt that guides the AI-generated content.
- **Humor Style**: Select the style of humor (Wholesome, Silly, Dry, Dark).

## Project Structure

The project is structured as follows:

```bash
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   ├── page
│   │   ├── Home.js
│   │   ├── Music.js
│   │   ├── ComedyShow.js
│   │   ├── Show24x7.js
│   └── App.js
│   └── App.css
│   └── index.js
└── README.md
```

- **`Header.js`**: Contains the navigation bar with links to Home, Dashboard, Music, Comedy Show, etc., and a user profile section.
- **`Footer.js`**: Contains social media icons, links to pages like About Us, Careers, Team, etc., and the copyright notice.
- **`ComedyShow.js`**: The main page where users can customize and generate their AI-powered comedy show.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/neilkumar93600/Interdimensional-Show.git
cd Interdimensional-Show
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

## Usage

1. Navigate to the Comedy Show page from the header.
2. Customize your comedy show by selecting the theme, audience, duration, characters, humor style, and a custom prompt.
3. Click on the "Generate Show" button, and the AI will create a unique comedy show based on your preferences.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS (Tailwind)**: For styling the components.
- **Node.js**: Used in the backend (if applicable, depending on API needs).
- **ESLint**: For maintaining code quality and consistency.

## Future Enhancements

- **AI Integration**: Connect with AI services to generate real-time comedy scripts based on user input.
- **User Authentication**: Allow users to save their favorite comedy shows and settings.
- **API Integration**: Retrieve live content or video generation features for more personalized experiences.

## Issues and Troubleshooting

- **ESLint Warnings**: If you encounter warnings like `'theme' is assigned a value but never used`, ensure the state variables are being properly utilized in the component logic.

## License

This project is licensed under the MIT License.

## Contributors

- [Neil Kumar](https://github.com/neilkumar93600)

Feel free to contribute by submitting issues or pull requests!
