import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CATEGORIES = [
  { label: "All", icon: "✦" },
  { label: "Breakfast", icon: "🍳" },
  { label: "Lunch", icon: "🥗" },
  { label: "Dinner", icon: "🍲" },
  { label: "Dessert", icon: "🍰" },
  { label: "Italian", icon: "🍝" },
  { label: "Asian", icon: "🥢" },
  { label: "Vegan", icon: "🥑" },
  { label: "Salads", icon: "🥬" },
  { label: "Drinks", icon: "🥤" },
  { label: "Snacks", icon: "🥨" },
  { label: "Favorites", icon: "♥" },
  { label: "My Food", icon: "👩‍🍳" },
];

const FOOD_CATEGORIES = CATEGORIES.filter(
  (item) => !["All", "Favorites", "My Food"].includes(item.label)
).map((item) => item.label);

const INITIAL_RECIPES = [
  {
    id: "r1",
    name: "Creamy Tomato Pasta",
    category: "Italian",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 25,
    servings: 2,
    calories: 420,
    difficulty: "Easy",
    ingredients: ["200 g pasta", "2 ripe tomatoes", "2 cloves garlic", "2 tbsp olive oil", "Fresh basil", "Parmesan, to serve"],
    instructions: ["Cook the pasta in salted boiling water until al dente.", "Warm olive oil in a pan and gently cook the garlic.", "Add chopped tomatoes and simmer for 8–10 minutes.", "Toss the pasta with the sauce and a splash of pasta water.", "Finish with basil and Parmesan, then serve."],
    isMine: false,
  },
  {
    id: "r2",
    name: "Avocado Breakfast Toast",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 10,
    servings: 1,
    calories: 310,
    difficulty: "Easy",
    ingredients: ["2 slices sourdough bread", "1 ripe avocado", "1 tsp lemon juice", "Chili flakes", "Salt and black pepper", "1 egg (optional)"],
    instructions: ["Toast the bread until golden.", "Mash the avocado with lemon juice, salt, and pepper.", "Spread the avocado over the toast.", "Top with chili flakes and an egg, if using."],
    isMine: false,
  },
  {
    id: "r3",
    name: "Rainbow Buddha Bowl",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 30,
    servings: 2,
    calories: 390,
    difficulty: "Easy",
    ingredients: ["1 cup cooked quinoa", "1 cup chickpeas", "1 avocado", "1 carrot, grated", "1 cucumber", "2 cups leafy greens", "Tahini dressing"],
    instructions: ["Prepare the quinoa according to the package instructions.", "Season and roast the chickpeas until crisp.", "Slice the vegetables and avocado.", "Arrange everything in bowls and drizzle with tahini dressing."],
    isMine: false,
  },
  {
    id: "r4",
    name: "Mango Coconut Smoothie",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 5,
    servings: 2,
    calories: 180,
    difficulty: "Easy",
    ingredients: ["1 ripe mango", "1 cup coconut milk", "½ cup ice", "½ banana", "Lime juice, to taste"],
    instructions: ["Peel and dice the mango.", "Add all ingredients to a blender.", "Blend until smooth, taste, and add lime juice if desired.", "Pour into chilled glasses and serve."],
    isMine: false,
  },
  {
    id: "r5",
    name: "Chocolate Lava Cakes",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 22,
    servings: 4,
    calories: 360,
    difficulty: "Medium",
    ingredients: ["100 g dark chocolate", "100 g butter", "2 eggs", "2 egg yolks", "¼ cup sugar", "2 tbsp flour"],
    instructions: ["Heat the oven to 200°C and grease four ramekins.", "Melt the chocolate and butter together, then cool slightly.", "Whisk eggs, yolks, and sugar until pale.", "Fold in the chocolate mixture and flour.", "Bake for 9–11 minutes and serve immediately."],
    isMine: false,
  },
  {
    id: "r6",
    name: "Sesame Ginger Noodles",
    category: "Asian",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 20,
    servings: 2,
    calories: 440,
    difficulty: "Easy",
    ingredients: ["200 g noodles", "1 tbsp sesame oil", "1 tbsp soy sauce", "1 tsp fresh ginger", "1 garlic clove", "Spring onions", "Sesame seeds"],
    instructions: ["Cook noodles according to the package, then drain.", "Mix sesame oil, soy sauce, ginger, and grated garlic.", "Toss the warm noodles with the sauce.", "Garnish with spring onions and sesame seeds."],
    isMine: false,
  },
  {
    id: "r7",
    name: "Lemon Herb Roast Chicken",
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b0b?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 55,
    servings: 4,
    calories: 510,
    difficulty: "Medium",
    ingredients: ["4 chicken thighs", "1 lemon", "3 garlic cloves", "2 tbsp olive oil", "Rosemary and thyme", "Salt and pepper"],
    instructions: ["Heat the oven to 200°C.", "Mix olive oil, lemon zest and juice, garlic, and herbs.", "Coat the chicken with the mixture and season well.", "Roast for 35–45 minutes or until cooked through.", "Rest for 5 minutes before serving."],
    isMine: false,
  },
  {
    id: "r8",
    name: "Greek Garden Salad",
    category: "Salads",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 15,
    servings: 2,
    calories: 230,
    difficulty: "Easy",
    ingredients: ["2 tomatoes", "1 cucumber", "½ red onion", "½ cup feta", "Kalamata olives", "2 tbsp olive oil", "1 tsp dried oregano"],
    instructions: ["Cut the tomatoes and cucumber into bite-sized pieces.", "Thinly slice the red onion.", "Combine vegetables, feta, and olives in a bowl.", "Dress with olive oil and oregano, then toss gently."],
    isMine: false,
  },
  {
    id: "r9",
    name: "Fluffy Blueberry Pancakes",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 20,
    servings: 3,
    calories: 340,
    difficulty: "Easy",
    ingredients: ["1 cup flour", "1 tbsp sugar", "1 tsp baking powder", "¾ cup milk", "1 egg", "½ cup blueberries"],
    instructions: ["Whisk flour, sugar, and baking powder in a bowl.", "Whisk milk and egg separately, then combine with dry ingredients.", "Fold in the blueberries without overmixing.", "Cook small pancakes on a lightly oiled pan until golden on both sides."],
    isMine: false,
  },
  {
    id: "r10",
    name: "Crispy Chickpea Wrap",
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 18,
    servings: 2,
    calories: 370,
    difficulty: "Easy",
    ingredients: ["1 can chickpeas, drained", "2 wraps", "½ tsp paprika", "Lettuce", "Tomato slices", "Plain yogurt or hummus"],
    instructions: ["Season the chickpeas with paprika, salt, and pepper.", "Pan-fry for 6–8 minutes until lightly crisp.", "Spread yogurt or hummus over each wrap.", "Add lettuce, tomato, and chickpeas, then roll tightly."],
    isMine: false,
  },
  {
    id: "r11",
    name: "Margherita Flatbread",
    category: "Italian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 17,
    servings: 2,
    calories: 400,
    difficulty: "Easy",
    ingredients: ["2 flatbreads", "½ cup tomato sauce", "Fresh mozzarella", "Fresh basil", "1 tsp olive oil"],
    instructions: ["Heat the oven to 220°C.", "Spread tomato sauce over each flatbread.", "Top with mozzarella and drizzle with olive oil.", "Bake for 8–10 minutes, then add fresh basil."],
    isMine: false,
  },
  {
    id: "r12",
    name: "Cinnamon Apple Oats",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 12,
    servings: 1,
    calories: 290,
    difficulty: "Easy",
    ingredients: ["½ cup rolled oats", "1 cup milk", "1 apple, diced", "½ tsp cinnamon", "1 tsp honey", "Chopped walnuts"],
    instructions: ["Bring oats and milk to a gentle simmer.", "Add half the apple and cinnamon.", "Cook, stirring, for 5–7 minutes until creamy.", "Top with remaining apple, honey, and walnuts."],
    isMine: false,
  },
  {
    id: "r13",
    name: "Crispy Potato Bites",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 35,
    servings: 4,
    calories: 260,
    difficulty: "Easy",
    ingredients: ["500 g baby potatoes", "1 tbsp olive oil", "1 tsp smoked paprika", "Garlic powder", "Salt", "Fresh parsley"],
    instructions: ["Heat the oven to 210°C and halve the potatoes.", "Toss with olive oil, paprika, garlic powder, and salt.", "Roast for 25–30 minutes, turning once.", "Finish with chopped parsley and serve warm."],
    isMine: false,
  },
  {
    id: "r14",
    name: "Teriyaki Rice Bowl",
    category: "Asian",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 28,
    servings: 2,
    calories: 460,
    difficulty: "Medium",
    ingredients: ["1 cup cooked rice", "250 g chicken or tofu", "2 tbsp teriyaki sauce", "1 cup broccoli", "1 carrot", "Sesame seeds"],
    instructions: ["Cook rice and steam the broccoli.", "Sear sliced chicken or tofu in a hot pan until cooked.", "Add teriyaki sauce and a splash of water; simmer briefly.", "Serve over rice with broccoli, carrot, and sesame seeds."],
    isMine: false,
  },
  {
    id: "r15",
    name: "Berry Yogurt Parfait",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1100&q=85",
    prepMinutes: 8,
    servings: 2,
    calories: 220,
    difficulty: "Easy",
    ingredients: ["1 cup Greek yogurt", "1 cup mixed berries", "¼ cup granola", "1 tbsp honey", "Mint leaves"],
    instructions: ["Spoon a layer of yogurt into two glasses.", "Add berries and a little granola.", "Repeat the layers.", "Finish with honey and mint just before serving."],
    isMine: false,
  },
];

const PALETTE = {
  background: "#F7F7F1",
  surface: "#FFFFFF",
  ink: "#1F3027",
  muted: "#758078",
  green: "#245640",
  greenLight: "#E8F0E8",
  lime: "#DDF27B",
  border: "#E6E9E1",
  orange: "#D98D55",
  danger: "#B54747",
};

const blankRecipe = () => ({
  name: "",
  category: "Lunch",
  image: "",
  prepMinutes: "20",
  servings: "2",
  calories: "350",
  difficulty: "Easy",
  ingredientsText: "",
  instructionsText: "",
});

const splitLines = (value) =>
  value
    .split(/\n|,/)
    .map((part) => part.trim())
    .filter(Boolean);

function PrimaryButton({ title, onPress, style, textStyle, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        style,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

function AppHeader({ title, subtitle, onBack }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back">
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>f.</Text>
          </View>
        )}
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>FRESH IDEAS DAILY</Text>
        </View>
      </View>
      <Text style={styles.appTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

function RecipeCard({ recipe, favorite, onOpen, onFavorite, onEdit, onDelete }) {
  return (
    <View style={styles.recipeCard}>
      <Pressable onPress={onOpen} style={({ pressed }) => [styles.cardTap, pressed && styles.cardPressed]}>
        <View style={styles.cardImageWrap}>
          {recipe.image ? (
            <Image source={{ uri: recipe.image }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            <View style={[styles.cardImage, styles.imagePlaceholder]}>
              <Text style={styles.placeholderEmoji}>🍽️</Text>
            </View>
          )}
          <View style={styles.cardCategory}>
            <Text style={styles.cardCategoryText}>{recipe.category}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.cardTitle}>{recipe.name}</Text>
          <View style={styles.cardMeta}>
            <Text style={styles.cardMetaText}>◷ {recipe.prepMinutes} min</Text>
            <Text style={styles.cardMetaText}>• {recipe.difficulty}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.cardActions}>
        <Pressable onPress={onFavorite} accessibilityRole="button" style={styles.heartButton}>
          <Text style={[styles.heartText, favorite && styles.heartActive]}>{favorite ? "♥" : "♡"}</Text>
        </Pressable>
        {recipe.isMine ? (
          <View style={styles.ownerActions}>
            <Pressable onPress={onEdit} style={styles.smallActionButton}>
              <Text style={styles.smallActionText}>Edit</Text>
            </Pressable>
            <Pressable onPress={onDelete} style={[styles.smallActionButton, styles.deleteAction]}>
              <Text style={[styles.smallActionText, styles.deleteText]}>Delete</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.littleNote}>View recipe ↗</Text>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [favorites, setFavorites] = useState(["r2"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [screen, setScreen] = useState("feed");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [draft, setDraft] = useState(blankRecipe());
  const [notice, setNotice] = useState("");

  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);

  const visibleRecipes = useMemo(() => {
    if (activeCategory === "Favorites") {
      return recipes.filter((recipe) => favorites.includes(recipe.id));
    }
    if (activeCategory === "My Food") {
      return recipes.filter((recipe) => recipe.isMine);
    }
    if (activeCategory === "All") {
      return recipes;
    }
    return recipes.filter((recipe) => recipe.category === activeCategory);
  }, [recipes, favorites, activeCategory]);

  const navigateBack = () => {
    setScreen("feed");
    setNotice("");
    if (screen === "form") {
      setActiveCategory(editingRecipeId ? "My Food" : "My Food");
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const openRecipe = (recipe) => {
    setSelectedRecipeId(recipe.id);
    setScreen("details");
    setNotice("");
  };

  const openNewRecipe = () => {
    setEditingRecipeId(null);
    setDraft(blankRecipe());
    setNotice("");
    setScreen("form");
  };

  const openEditRecipe = (recipe) => {
    setEditingRecipeId(recipe.id);
    setDraft({
      name: recipe.name,
      category: recipe.category,
      image: recipe.image || "",
      prepMinutes: String(recipe.prepMinutes || 20),
      servings: String(recipe.servings || 2),
      calories: String(recipe.calories || 350),
      difficulty: recipe.difficulty || "Easy",
      ingredientsText: recipe.ingredients.join("\n"),
      instructionsText: recipe.instructions.join("\n"),
    });
    setNotice("");
    setScreen("form");
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets[0]) {
        setDraft((current) => ({ ...current, image: result.assets[0].uri }));
      }
    } catch (error) {
      Alert.alert("Image picker", "Please try selecting an image again.");
    }
  };

  const saveRecipe = () => {
    const ingredients = splitLines(draft.ingredientsText);
    const instructions = splitLines(draft.instructionsText);
    if (!draft.name.trim()) {
      Alert.alert("Recipe name needed", "Please enter a name for your recipe.");
      return;
    }
    if (ingredients.length === 0) {
      Alert.alert("Add ingredients", "Please enter at least one ingredient.");
      return;
    }
    if (instructions.length === 0) {
      Alert.alert("Add instructions", "Please enter at least one preparation step.");
      return;
    }

    const safeNumber = (value, fallback) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    };

    if (editingRecipeId) {
      setRecipes((current) =>
        current.map((recipe) =>
          recipe.id === editingRecipeId
            ? {
                ...recipe,
                name: draft.name.trim(),
                category: draft.category,
                image: draft.image,
                prepMinutes: safeNumber(draft.prepMinutes, 20),
                servings: safeNumber(draft.servings, 2),
                calories: safeNumber(draft.calories, 350),
                difficulty: draft.difficulty,
                ingredients,
                instructions,
              }
            : recipe
        )
      );
      setNotice("Recipe updated successfully.");
    } else {
      const newId = "mine-" + Date.now().toString();
      const newRecipe = {
        id: newId,
        name: draft.name.trim(),
        category: draft.category,
        image: draft.image,
        prepMinutes: safeNumber(draft.prepMinutes, 20),
        servings: safeNumber(draft.servings, 2),
        calories: safeNumber(draft.calories, 350),
        difficulty: draft.difficulty,
        ingredients,
        instructions,
        isMine: true,
      };
      setRecipes((current) => [newRecipe, ...current]);
      setSelectedRecipeId(newId);
      setNotice("Recipe saved to My Recipes.");
    }
    setActiveCategory("My Food");
    setEditingRecipeId(null);
    setScreen("feed");
  };

  const deleteRecipe = (recipe) => {
    const performDelete = () => {
      setRecipes((current) => current.filter((item) => item.id !== recipe.id));
      setFavorites((current) => current.filter((id) => id !== recipe.id));
      if (selectedRecipeId === recipe.id) setSelectedRecipeId(null);
      setNotice("Recipe deleted.");
    };
    if (Platform.OS === "web") {
      const confirmed = typeof window !== "undefined" && window.confirm("Delete " + recipe.name + "?");
      if (confirmed) performDelete();
    } else {
      Alert.alert("Delete recipe?", "This will permanently remove " + recipe.name + ".", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: performDelete },
      ]);
    }
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const renderFeed = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedScroll}>
      <View style={styles.welcomeRow}>
        <View style={styles.welcomeCopy}>
          <Text style={styles.eyebrow}>COOK SOMETHING LOVELY</Text>
          <Text style={styles.welcomeTitle}>
            Good food,{"\n"}good mood.
          </Text>
          <Text style={styles.welcomeDescription}>
            Discover your next delicious favourite.
          </Text>
        </View>
        <View style={styles.welcomeIllustration}>
          <Text style={styles.welcomeEmoji}>🥑</Text>
          <Text style={styles.illustrationSparkle}>✦</Text>
        </View>
      </View>

      <View style={styles.categoryHeadingRow}>
        <Text style={styles.sectionTitle}>Explore categories</Text>
        <Text style={styles.countLabel}>{CATEGORIES.length - 3} tastes to try</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        {CATEGORIES.map((category) => {
          const active = category.label === activeCategory;
          return (
            <Pressable
              key={category.label}
              onPress={() => {
                setActiveCategory(category.label);
                setNotice("");
              }}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {activeCategory === "My Food" ? (
        <View style={styles.myFoodBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.myFoodTitle}>Your kitchen, your rules</Text>
            <Text style={styles.myFoodDescription}>Keep your own recipes in one place.</Text>
          </View>
          <PrimaryButton title="+ Add New Recipe" onPress={openNewRecipe} style={styles.addNewButton} textStyle={styles.addNewButtonText} />
        </View>
      ) : null}

      {activeCategory === "Favorites" ? (
        <View style={styles.sectionIntro}>
          <Text style={styles.sectionTitle}>Your Favorites ♥</Text>
          <Text style={styles.sectionDescription}>Recipes you saved for another delicious day.</Text>
        </View>
      ) : activeCategory === "My Food" ? (
        <View style={styles.sectionIntro}>
          <Text style={styles.sectionTitle}>My Recipes</Text>
          <Text style={styles.sectionDescription}>Your personal collection of homemade favourites.</Text>
        </View>
      ) : (
        <View style={styles.sectionIntro}>
          <Text style={styles.sectionTitle}>{activeCategory === "All" ? "Popular this week" : activeCategory + " recipes"}</Text>
          <Text style={styles.sectionDescription}>
            {activeCategory === "All" ? "A little inspiration for every kind of appetite." : "Fresh ideas picked for this category."}
          </Text>
        </View>
      )}

      {!!notice && (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>✓ {notice}</Text>
          <Pressable onPress={() => setNotice("")}><Text style={styles.noticeClose}>×</Text></Pressable>
        </View>
      )}

      {visibleRecipes.length ? (
        <View style={styles.recipeGrid}>
          {visibleRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeGridItem}>
              <RecipeCard
                recipe={recipe}
                favorite={favorites.includes(recipe.id)}
                onOpen={() => openRecipe(recipe)}
                onFavorite={() => toggleFavorite(recipe.id)}
                onEdit={() => openEditRecipe(recipe)}
                onDelete={() => deleteRecipe(recipe)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>{activeCategory === "Favorites" ? "♡" : "🍽️"}</Text>
          <Text style={styles.emptyTitle}>{activeCategory === "Favorites" ? "No favourites yet" : "Your recipe box is empty"}</Text>
          <Text style={styles.emptyDescription}>
            {activeCategory === "Favorites"
              ? "Tap the heart on any recipe to save it here."
              : "Add your first recipe and it will appear here."}
          </Text>
          {activeCategory === "My Food" && <PrimaryButton title="+ Add New Recipe" onPress={openNewRecipe} style={styles.emptyButton} />}
        </View>
      )}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );

  const renderDetails = () => {
    if (!selectedRecipe) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Recipe not found</Text>
          <PrimaryButton title="Go to recipes" onPress={navigateBack} />
        </View>
      );
    }
    const isFavorite = favorites.includes(selectedRecipe.id);
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
        {selectedRecipe.image ? (
          <Image source={{ uri: selectedRecipe.image }} style={styles.detailImage} resizeMode="cover" />
        ) : (
          <View style={[styles.detailImage, styles.imagePlaceholder]}><Text style={styles.placeholderEmoji}>🍽️</Text></View>
        )}
        <View style={styles.detailHeadingRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.detailCategoryPill}>
              <Text style={styles.detailCategoryText}>{selectedRecipe.category}</Text>
            </View>
            <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
            <Text style={styles.detailCaption}>Made with love. Shared with you.</Text>
          </View>
          <Pressable onPress={() => toggleFavorite(selectedRecipe.id)} style={styles.detailHeart} accessibilityRole="button" accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Text style={[styles.detailHeartText, isFavorite && styles.heartActive]}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>◷</Text>
            <Text style={styles.statValue}>{selectedRecipe.prepMinutes} min</Text>
            <Text style={styles.statLabel}>Prep time</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>♧</Text>
            <Text style={styles.statValue}>{selectedRecipe.servings}</Text>
            <Text style={styles.statLabel}>Servings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>♡</Text>
            <Text style={styles.statValue}>{selectedRecipe.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✦</Text>
            <Text style={styles.statValue}>{selectedRecipe.difficulty}</Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailSectionTitleRow}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.countLabel}>{selectedRecipe.ingredients.length} items</Text>
          </View>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.ingredientBullet}><Text style={styles.ingredientBulletText}>✓</Text></View>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Step-by-step instructions</Text>
          {selectedRecipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionRow}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {selectedRecipe.isMine ? (
          <View style={styles.detailOwnerActions}>
            <PrimaryButton title="Edit Recipe" onPress={() => openEditRecipe(selectedRecipe)} style={styles.editDetailButton} textStyle={styles.editDetailText} />
            <PrimaryButton title="Delete Recipe" onPress={() => deleteRecipe(selectedRecipe)} style={styles.deleteDetailButton} textStyle={styles.deleteDetailText} />
          </View>
        ) : null}
        <View style={styles.bottomSpace} />
      </ScrollView>
    );
  };

  const renderForm = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScroll}>
        <View style={styles.formIntro}>
          <Text style={styles.eyebrow}>{editingRecipeId ? "MAKE IT EVEN BETTER" : "FROM YOUR KITCHEN"}</Text>
          <Text style={styles.formTitle}>{editingRecipeId ? "Edit your recipe" : "Add a new recipe"}</Text>
          <Text style={styles.formDescription}>A great recipe starts with a few good ingredients.</Text>
        </View>

        <Text style={styles.fieldLabel}>Recipe name *</Text>
        <TextInput
          value={draft.name}
          onChangeText={(value) => updateDraft("name", value)}
          placeholder="e.g. Grandma's apple pie"
          placeholderTextColor="#9AA49C"
          style={styles.input}
          accessibilityLabel="Recipe name"
        />

        <Text style={styles.fieldLabel}>Recipe image</Text>
        <Pressable onPress={pickImage} style={styles.imagePickerBox} accessibilityRole="button">
          {draft.image ? (
            <Image source={{ uri: draft.image }} style={styles.pickedImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePickerPlaceholder}>
              <Text style={styles.imagePickerIcon}>＋</Text>
              <Text style={styles.imagePickerTitle}>Upload a food photo</Text>
              <Text style={styles.imagePickerHint}>Choose an image from your device</Text>
            </View>
          )}
          <View style={styles.imagePickerBadge}><Text style={styles.imagePickerBadgeText}>{draft.image ? "Change image" : "Choose image"}</Text></View>
        </Pressable>

        <Text style={styles.fieldLabel}>Category *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formCategoryList}>
          {FOOD_CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => updateDraft("category", category)}
              style={[styles.formCategoryChip, draft.category === category && styles.formCategoryChipActive]}
            >
              <Text style={[styles.formCategoryText, draft.category === category && styles.formCategoryTextActive]}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.fieldLabel}>Ingredients list * <Text style={styles.fieldHint}>(one per line)</Text></Text>
        <TextInput
          value={draft.ingredientsText}
          onChangeText={(value) => updateDraft("ingredientsText", value)}
          placeholder={"2 cups flour\n1 cup milk\n2 eggs"}
          placeholderTextColor="#9AA49C"
          style={[styles.input, styles.multilineInput]}
          multiline
          textAlignVertical="top"
          accessibilityLabel="Ingredients list"
        />

        <Text style={styles.fieldLabel}>Step-by-step instructions * <Text style={styles.fieldHint}>(one step per line)</Text></Text>
        <TextInput
          value={draft.instructionsText}
          onChangeText={(value) => updateDraft("instructionsText", value)}
          placeholder={"Preheat the oven.\nMix the dry ingredients.\nBake until golden."}
          placeholderTextColor="#9AA49C"
          style={[styles.input, styles.multilineInput, { minHeight: 150 }]}
          multiline
          textAlignVertical="top"
          accessibilityLabel="Step-by-step instructions"
        />

        <Text style={styles.fieldLabel}>Recipe details</Text>
        <View style={styles.metadataInputs}>
          <View style={styles.metadataField}>
            <Text style={styles.metadataLabel}>Prep (min)</Text>
            <TextInput value={draft.prepMinutes} onChangeText={(value) => updateDraft("prepMinutes", value)} keyboardType="number-pad" style={styles.input} />
          </View>
          <View style={styles.metadataField}>
            <Text style={styles.metadataLabel}>Servings</Text>
            <TextInput value={draft.servings} onChangeText={(value) => updateDraft("servings", value)} keyboardType="number-pad" style={styles.input} />
          </View>
          <View style={styles.metadataField}>
            <Text style={styles.metadataLabel}>Calories</Text>
            <TextInput value={draft.calories} onChangeText={(value) => updateDraft("calories", value)} keyboardType="number-pad" style={styles.input} />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Difficulty level</Text>
        <View style={styles.difficultyList}>
          {["Easy", "Medium", "Hard"].map((level) => (
            <Pressable key={level} onPress={() => updateDraft("difficulty", level)} style={[styles.difficultyChip, draft.difficulty === level && styles.difficultyChipActive]}>
              <Text style={[styles.difficultyText, draft.difficulty === level && styles.difficultyTextActive]}>{level}</Text>
            </Pressable>
          ))}
        </View>

        <PrimaryButton title={editingRecipeId ? "Save Changes" : "Save Recipe"} onPress={saveRecipe} style={styles.saveButton} />
        <Pressable onPress={navigateBack} style={styles.cancelButton}><Text style={styles.cancelText}>Cancel</Text></Pressable>
        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.appRoot}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.background} />
      {screen === "feed" ? (
        <>
          <AppHeader title="Foodie" subtitle="Recipes worth sharing." />
          {renderFeed()}
        </>
      ) : screen === "details" ? (
        <>
          <AppHeader title="Recipe details" subtitle="Everything you need to make it delicious." onBack={navigateBack} />
          {renderDetails()}
        </>
      ) : (
        <>
          <AppHeader title={editingRecipeId ? "Edit recipe" : "New recipe"} subtitle="Make something wonderful." onBack={navigateBack} />
          {renderForm()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: PALETTE.background, paddingTop: Platform.OS === "android" ? 8 : 0 },
  header: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 16, backgroundColor: PALETTE.background },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 36, marginBottom: 12 },
  brandMark: { width: 38, height: 38, borderRadius: 14, backgroundColor: PALETTE.green, alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  headerBadge: { backgroundColor: PALETTE.greenLight, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  headerBadgeText: { color: PALETTE.green, fontSize: 9, letterSpacing: 1.1, fontWeight: "800" },
  backButton: { flexDirection: "row", alignItems: "center", paddingVertical: 3, paddingRight: 8 },
  backArrow: { color: PALETTE.green, fontSize: 32, lineHeight: 32, marginRight: 3 },
  backText: { color: PALETTE.green, fontSize: 14, fontWeight: "700" },
  appTitle: { color: PALETTE.ink, fontSize: 30, fontWeight: "900", letterSpacing: -0.7 },
  subtitle: { color: PALETTE.muted, fontSize: 13, marginTop: 3 },
  feedScroll: { paddingHorizontal: 22, paddingBottom: 24 },
  welcomeRow: { backgroundColor: PALETTE.green, borderRadius: 25, minHeight: 170, padding: 21, flexDirection: "row", alignItems: "center", overflow: "hidden", marginBottom: 26 },
  welcomeCopy: { flex: 1, paddingRight: 4 },
  eyebrow: { color: "#AFC99C", fontSize: 10, letterSpacing: 1.8, fontWeight: "800", marginBottom: 8 },
  welcomeTitle: { color: "#FFFFFF", fontSize: 29, lineHeight: 31, letterSpacing: -0.8, fontWeight: "900" },
  welcomeDescription: { color: "#DFEADF", fontSize: 12, marginTop: 9, lineHeight: 18, maxWidth: 200 },
  welcomeIllustration: { width: 105, height: 105, borderRadius: 36, backgroundColor: PALETTE.lime, alignItems: "center", justifyContent: "center", transform: [{ rotate: "7deg" }], marginLeft: 8 },
  welcomeEmoji: { fontSize: 58, transform: [{ rotate: "-7deg" }] },
  illustrationSparkle: { color: PALETTE.green, fontSize: 22, position: "absolute", top: 1, right: 9 },
  categoryHeadingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 13 },
  sectionTitle: { color: PALETTE.ink, fontSize: 19, fontWeight: "800", letterSpacing: -0.3 },
  countLabel: { color: PALETTE.muted, fontSize: 11, fontWeight: "700" },
  categoryList: { paddingBottom: 3, paddingRight: 12, gap: 8 },
  categoryChip: { flexDirection: "row", alignItems: "center", backgroundColor: PALETTE.surface, borderColor: PALETTE.border, borderWidth: 1, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 10, gap: 6 },
  categoryChipActive: { backgroundColor: PALETTE.green, borderColor: PALETTE.green },
  categoryIcon: { fontSize: 13 },
  categoryText: { color: PALETTE.ink, fontSize: 12, fontWeight: "700" },
  categoryTextActive: { color: "#FFFFFF" },
  sectionIntro: { marginTop: 24, marginBottom: 14 },
  sectionDescription: { color: PALETTE.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  recipeGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  recipeGridItem: { width: "48.3%", marginBottom: 16 },
  recipeCard: { backgroundColor: PALETTE.surface, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "#EBEDE7" },
  cardTap: { width: "100%" },
  cardPressed: { opacity: 0.85 },
  cardImageWrap: { width: "100%", height: 132, position: "relative", backgroundColor: "#E9E9DE" },
  cardImage: { width: "100%", height: "100%" },
  imagePlaceholder: { alignItems: "center", justifyContent: "center", backgroundColor: "#E7EDE2" },
  placeholderEmoji: { fontSize: 45 },
  cardCategory: { position: "absolute", top: 9, left: 9, backgroundColor: "rgba(255,255,255,0.93)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5 },
  cardCategoryText: { color: PALETTE.green, fontSize: 9, fontWeight: "800" },
  cardBody: { paddingHorizontal: 11, paddingTop: 11, paddingBottom: 8 },
  cardTitle: { color: PALETTE.ink, fontSize: 14, fontWeight: "800", lineHeight: 18, minHeight: 36 },
  cardMeta: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginTop: 7, gap: 6 },
  cardMetaText: { color: PALETTE.muted, fontSize: 10, fontWeight: "600" },
  cardActions: { borderTopWidth: 1, borderTopColor: "#F0F1EC", paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 38 },
  heartButton: { width: 26, height: 26, alignItems: "center", justifyContent: "center" },
  heartText: { color: "#8C968E", fontSize: 23, lineHeight: 26 },
  heartActive: { color: "#E45A67" },
  littleNote: { color: PALETTE.muted, fontSize: 9, fontWeight: "700" },
  ownerActions: { flexDirection: "row", gap: 5 },
  smallActionButton: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, backgroundColor: PALETTE.greenLight },
  smallActionText: { color: PALETTE.green, fontSize: 10, fontWeight: "800" },
  deleteAction: { backgroundColor: "#F9E9E8" },
  deleteText: { color: PALETTE.danger },
  myFoodBanner: { backgroundColor: "#EBF1D8", borderRadius: 18, padding: 16, flexDirection: "row", alignItems: "center", marginTop: 18, gap: 10 },
  myFoodTitle: { color: PALETTE.ink, fontSize: 14, fontWeight: "800" },
  myFoodDescription: { color: PALETTE.muted, fontSize: 11, lineHeight: 16, marginTop: 4, maxWidth: 180 },
  addNewButton: { paddingHorizontal: 12, paddingVertical: 11, borderRadius: 12 },
  addNewButtonText: { fontSize: 11 },
  primaryButton: { backgroundColor: PALETTE.green, borderRadius: 14, paddingVertical: 15, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  disabledButton: { opacity: 0.5 },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 46, paddingHorizontal: 25, backgroundColor: PALETTE.surface, borderRadius: 20, borderWidth: 1, borderColor: PALETTE.border, marginTop: 20 },
  emptyEmoji: { fontSize: 42, color: PALETTE.green, marginBottom: 12 },
  emptyTitle: { color: PALETTE.ink, fontSize: 17, fontWeight: "800", textAlign: "center" },
  emptyDescription: { color: PALETTE.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 6, marginBottom: 18 },
  emptyButton: { marginTop: 2, width: "100%" },
  notice: { borderRadius: 12, backgroundColor: PALETTE.greenLight, padding: 11, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  noticeText: { color: PALETTE.green, fontSize: 12, fontWeight: "700", flex: 1 },
  noticeClose: { color: PALETTE.green, fontSize: 20, paddingHorizontal: 5 },
  detailScroll: { paddingHorizontal: 22, paddingBottom: 26 },
  detailImage: { width: "100%", height: 245, borderRadius: 22, backgroundColor: "#E9E9DE" },
  detailHeadingRow: { flexDirection: "row", alignItems: "center", marginTop: 18, marginBottom: 18 },
  detailCategoryPill: { alignSelf: "flex-start", borderRadius: 10, backgroundColor: PALETTE.greenLight, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 8 },
  detailCategoryText: { color: PALETTE.green, fontSize: 10, fontWeight: "800" },
  detailTitle: { color: PALETTE.ink, fontSize: 27, lineHeight: 31, fontWeight: "900", letterSpacing: -0.6 },
  detailCaption: { color: PALETTE.muted, fontSize: 12, marginTop: 6 },
  detailHeart: { width: 52, height: 52, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: PALETTE.border, alignItems: "center", justifyContent: "center", marginLeft: 12 },
  detailHeartText: { color: "#8C968E", fontSize: 29, lineHeight: 32 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", gap: 7, marginBottom: 26 },
  statCard: { flex: 1, backgroundColor: PALETTE.surface, borderRadius: 15, borderWidth: 1, borderColor: PALETTE.border, alignItems: "center", paddingVertical: 13, paddingHorizontal: 3 },
  statIcon: { color: PALETTE.green, fontSize: 17, marginBottom: 7 },
  statValue: { color: PALETTE.ink, fontSize: 12, fontWeight: "800", textAlign: "center" },
  statLabel: { color: PALETTE.muted, fontSize: 9, marginTop: 4, textAlign: "center" },
  detailSection: { backgroundColor: PALETTE.surface, borderRadius: 19, borderWidth: 1, borderColor: PALETTE.border, padding: 17, marginBottom: 16 },
  detailSectionTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  ingredientRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F1F2ED" },
  ingredientBullet: { width: 23, height: 23, borderRadius: 8, backgroundColor: PALETTE.greenLight, alignItems: "center", justifyContent: "center", marginRight: 10 },
  ingredientBulletText: { color: PALETTE.green, fontSize: 12, fontWeight: "900" },
  ingredientText: { flex: 1, color: PALETTE.ink, fontSize: 13, lineHeight: 19 },
  instructionRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 16 },
  stepNumber: { width: 28, height: 28, borderRadius: 10, backgroundColor: PALETTE.lime, alignItems: "center", justifyContent: "center", marginRight: 11 },
  stepNumberText: { color: PALETTE.green, fontWeight: "900", fontSize: 12 },
  instructionText: { color: PALETTE.ink, flex: 1, fontSize: 13, lineHeight: 20, paddingTop: 3 },
  detailOwnerActions: { flexDirection: "row", gap: 10, marginBottom: 14 },
  editDetailButton: { flex: 1 },
  editDetailText: { fontSize: 12 },
  deleteDetailButton: { flex: 1, backgroundColor: "#F9E9E8" },
  deleteDetailText: { color: PALETTE.danger, fontSize: 12 },
  formScroll: { paddingHorizontal: 22, paddingBottom: 26 },
  formIntro: { paddingVertical: 10, marginBottom: 13 },
  formTitle: { color: PALETTE.ink, fontSize: 26, fontWeight: "900", letterSpacing: -0.6 },
  formDescription: { color: PALETTE.muted, fontSize: 12, marginTop: 6, lineHeight: 18 },
  fieldLabel: { color: PALETTE.ink, fontSize: 13, fontWeight: "800", marginTop: 18, marginBottom: 8 },
  fieldHint: { color: PALETTE.muted, fontSize: 10, fontWeight: "500" },
  input: { backgroundColor: PALETTE.surface, borderWidth: 1, borderColor: PALETTE.border, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 13, color: PALETTE.ink, fontSize: 13, minHeight: 47 },
  multilineInput: { minHeight: 115, paddingTop: 13, lineHeight: 20 },
  imagePickerBox: { width: "100%", height: 190, backgroundColor: PALETTE.surface, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: PALETTE.border, borderStyle: "dashed", alignItems: "center", justifyContent: "center" },
  pickedImage: { width: "100%", height: "100%" },
  imagePickerPlaceholder: { alignItems: "center" },
  imagePickerIcon: { fontSize: 30, color: PALETTE.green, width: 48, height: 48, textAlign: "center", textAlignVertical: "center", borderRadius: 16, backgroundColor: PALETTE.greenLight, marginBottom: 9, overflow: "hidden" },
  imagePickerTitle: { color: PALETTE.ink, fontWeight: "800", fontSize: 13 },
  imagePickerHint: { color: PALETTE.muted, fontSize: 11, marginTop: 5 },
  imagePickerBadge: { position: "absolute", bottom: 10, right: 10, backgroundColor: PALETTE.green, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 10 },
  imagePickerBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  formCategoryList: { gap: 7, paddingVertical: 2 },
  formCategoryChip: { backgroundColor: PALETTE.surface, borderWidth: 1, borderColor: PALETTE.border, borderRadius: 13, paddingHorizontal: 12, paddingVertical: 9 },
  formCategoryChipActive: { backgroundColor: PALETTE.green, borderColor: PALETTE.green },
  formCategoryText: { color: PALETTE.ink, fontSize: 11, fontWeight: "700" },
  formCategoryTextActive: { color: "#FFFFFF" },
  metadataInputs: { flexDirection: "row", gap: 9 },
  metadataField: { flex: 1 },
  metadataLabel: { color: PALETTE.muted, fontSize: 10, marginBottom: 6, fontWeight: "700" },
  difficultyList: { flexDirection: "row", gap: 8 },
  difficultyChip: { flex: 1, alignItems: "center", paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: PALETTE.border, backgroundColor: PALETTE.surface },
  difficultyChipActive: { backgroundColor: PALETTE.greenLight, borderColor: PALETTE.green },
  difficultyText: { color: PALETTE.muted, fontSize: 12, fontWeight: "700" },
  difficultyTextActive: { color: PALETTE.green },
  saveButton: { marginTop: 25, paddingVertical: 16 },
  cancelButton: { alignItems: "center", paddingVertical: 15 },
  cancelText: { color: PALETTE.muted, fontWeight: "700", fontSize: 13 },
  bottomSpace: { height: 30 },
});
