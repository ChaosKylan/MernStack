const User = require("../models/User.schema");
const ShoppingList = require("../models/ShoppingList.schema");
const bcrypt = require("bcrypt");

const updateAccount = async (req, res) => {
    const { hasUpdatedPassword, newUsername, newPassword } = req.body;
    const { id: userId } = req.authenticatedUser;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User/Account wurde nicht gefunden",
            });
        }

        if (hasUpdatedPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            user.username = newUsername;

            await user.save();
            res.status(200).json(user);
        } else {
            user.username = newUsername;
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({
            message: "Account konnte nicht aktualisiert werden",
        });
    }
};

const deleteAccount = async (req, res) => {
    const { id: userId } = req.authenticatedUser;

    try {
        await User.deleteOne({ _id: userId });
        await ShoppingList.deleteMany({ userId: userId });

        return res.status(200).json({
            message: "Der Account wurde erfolgreich gelöscht",
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Der Account konnte nicht gelöscht werden",
            error: true,
        });
    }
};

module.exports = {
    updateAccount,
    deleteAccount,
};
