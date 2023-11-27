const express = require('express');
const app = express();
const axios = require('axios'); 
const bodyParser = require('body-parser');
const multer = require('multer');
const PORT = "3000";
const upload = multer({
    dest: 'uploads/',
  });

let aux = "pizza";

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());


app.get('/', async (req, res) => {
  try {
    const food = aux; 
    const recipeResponse = await axios.get(`http://localhost:3000/recipe/${food}`);

    const recipe = recipeResponse.data;

    res.render('index', { recipe });
  } catch (error) {
    res.status(500).send('Error fetching recipe');
  }
});

let recipes = {
    pizza: {
      name: 'Pizza',
      instructions: [
        'preheat oven 225C',
        'slice mozzarellas',
        'put tomato sauce on pizza base',
        'put mozzarella slices on pizza',
        'bake for 15 min'
      ],
      ingredients: [
        '1 frozen pizza base',
        '1 tomato sauce',
        '2 mozzarellas'
      ]
    },
    pasta: {
      name: 'Pasta',
      instructions: [
        'Put it in oven for 30 min',
        'Meanwhile, make the sauce',
        'Drain the pasta and return it to the pot.',
        'Add your favorite sauce and toss until coated.'
      ],
      ingredients: [
        'Pasta',
        'Pasta sauce',
        'Salt (for boiling water)',
        'Optional: Parmesan cheese, fresh herbs for garnish'
      ]
    },
    tikka_masala: {
      name: 'Tikka_Masala',
      instructions: [
        'Put it in oven for 30 min',
        'Meanwhile, make the sauce',
        'Prepare the gravy by sautéing onions, adding spices, and pureed tomatoes.',
        'Combine cooked chicken with the gravy and simmer with cream.',
        'Garnish with fresh coriander leaves and serve hot.'
      ],
      ingredients: [
        'Boneless chicken',
        'Tikka_Masala',
        'Ginger-garlic paste',
        'Spices (turmeric powder, red chili powder, garam masala)'
      ]
    },
    casserole:{
        name: 'Casserole',
        instructions: [
          'Put it in oven for 30 min',
          'Meanwhile, make the sauce',
          'Prepare the gravy by sautéing onions, adding spices, and pureed tomatoes.',
          'Combine cooked chicken with the gravy and simmer with cream.',
          'Garnish with fresh coriander leaves and serve hot.'
        ],
        ingredients: [
          'Boneless chicken',
          'Plain yogurt',
          'Ginger-garlic paste',
          'Spices (turmeric powder, red chili powder, garam masala)'
        ]
    },
    lasagna:{
        name: 'Lasagna',
        instructions: [
          'Put it in oven for 30 min',
          'Meanwhile, make the sauce',
          'Prepare the gravy by sautéing onions, adding spices, and pureed tomatoes.',
          'Combine cooked chicken with the gravy and simmer with cream.',
          'Garnish with fresh coriander leaves and serve hot.'
        ],
        ingredients: [
          'Lasagna',
          'Plain yogurt',
          'Ginger-garlic paste',
          'Spices (turmeric powder, red chili powder, garam masala)'
        ]
    }
  };
  


  app.get('/recipe/:food', (req, res) => {
    const food = req.params.food.toLowerCase();
    aux = food;
    if (recipes[food]) {
      res.json({
        name: recipes[food].name,
        instructions: recipes[food].instructions,
        ingredients: recipes[food].ingredients
      });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  });
  

app.post('/recipe/', (req, res) => {
    const { name, instructions, ingredients } = req.body;
  
    if (!name || !instructions || !ingredients) {
      return res.status(400).json({ error: 'Please provide name, instructions, and ingredients for the recipe.' });
    }
  
    const newRecipe = {
      name,
      instructions,
      ingredients
    };
  
    recipes[name] = newRecipe;
    res.json(newRecipe);
  });

  app.post('/images', upload.array('images'), (req, res) => {
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No images were uploaded.');
    }
  
    res.status(200).send('Images uploaded successfully!');
  });




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
