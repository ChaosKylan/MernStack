const ShoppingList = require('../models/ShoppingList.schema');

// GET (alle Shopping Listen für den User)
const getShoppingLists = async (req, res) => {
  const { id } = req.authenticatedUser;

  try {
    const lists = await ShoppingList.find({ userId: id });

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({
      message: 'Error: Shopping Listen konnten nicht gefunden werden',
    });
  }
};

// GET by ID (eine bestimmte Shopping Liste für den User)
const getShoppingListById = async (req, res) => {
  const shoppingListId = req.params.id;

  try {
    const list = await ShoppingList.findById(shoppingListId);

    if (!list) {
      return res.status(404).json({
        message: 'Shopping Liste konnte nicht gefunden werden',
      });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({
      message: 'Etwas ist schief gelaufen bei der Abfrage einer Shopping-Liste',
    });
  }
};

// POST (neue Shopping Liste erstellen)
const createShoppingList = async (req, res) => {
  const { name, items } = req.body;
  const { username, id } = req.authenticatedUser;

  try {
    const newShoppingList = await ShoppingList.create({
      name,
      items,
      username,
      userId: id,
    });

    res.json(newShoppingList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Etwas ist schief gelaufen bei der Erstellung einer Shopping-Liste',
    });
  }
};

// PUT (eine Shopping Liste updaten)
const updateShoppingList = async (req, res) => {
  const { id, name, items } = req.body;

  try {
    // Shopping Liste anhand der ID in der Datenbank (MongoDB) suchen
    const shoppingList = await ShoppingList.findById(id);

    if (!shoppingList) {
      return res.status(404).json({
        message: 'Shopping List wurde nicht gefunden',
      });
    }

    shoppingList.name = name;
    shoppingList.items = items;

    await shoppingList.save();

    res.json(shoppingList);
  } catch (error) {
    return res.status(500).json({
      message: 'Die Shopping Liste konnte nicht gespeichert werden',
    });
  }
};

// DELETE (eine Shopping Liste löschen)
const deleteShoppingList = async (req, res) => {
  const { shoppingListId } = req.params;

  try {
    await ShoppingList.deleteOne({ _id: shoppingListId });

    res.status(200).json({
      message: 'Shopping Liste wurde erfolgreich gelöscht',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Shopping Liste konnte nicht gelöscht werden',
    });
  }
};

module.exports = {
  getShoppingLists,
  getShoppingListById,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
};
