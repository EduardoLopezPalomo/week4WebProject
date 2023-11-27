const express = require('express');
const app = express();
const axios = require('axios'); 
const bodyParser = require('body-parser');
const multer = require('multer');
const PORT = "3000";
const upload = multer({
    dest: 'uploads/',
  });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());


app.get('/', async (req, res) => {
  try {
    const food = 'pizza'; 
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
        'Preheat oven to 475°F (245°C).',
        'Spread dough on a pizza pan.',
        'Add sauce, cheese, and desired toppings.',
        'Bake in preheated oven for 12-15 minutes.'
      ],
      ingredients: [
        'Pizza dough',
        'Pizza sauce',
        'Cheese',
        'Toppings of your choice (e.g., pepperoni, mushrooms, bell peppers)'
      ]
    },
    pasta: {
      name: 'Pasta',
      instructions: [
        'Boil water in a large pot.',
        'Add pasta and cook until al dente.',
        'Drain the pasta and return it to the pot.',
        'Add your favorite sauce and toss until coated.'
      ],
      ingredients: [
        'Pasta of your choice',
        'Pasta sauce',
        'Salt (for boiling water)',
        'Optional: Parmesan cheese, fresh herbs for garnish'
      ]
    },
    tikka_masala: {
      name: 'Tikka_Masala',
      instructions: [
        'Marinate chicken in yogurt and spices.',
        'Cook marinated chicken until browned and set aside.',
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
    casserole:{
        name: 'casserole',
        instructions: [
          'Marinate chicken in yogurt and spices.',
          'Cook marinated chicken until browned and set aside.',
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
    }
  };
  


  app.get('/recipe/:food', (req, res) => {
    const food = req.params.food.toLowerCase();
  
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
