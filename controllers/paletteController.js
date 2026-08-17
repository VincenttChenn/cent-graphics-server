// first step, import the models that we need to use in this controller

import Palette from "../models/Palette.js";
import User from "../models/User.js";

//get all palettes
export const getPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const getSavedPalettes = async (req, res) => {
    try {
    // Ambil data user beserta detail palette yang di-save
    const user = await User.findById(req.userId).populate("savedPalettes");

    // Kirim array berisi data palette lengkap ke Frontend
    res.status(200).json(user.savedPalettes);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

//submit new palette
export const createPalette = async (req, res) => {
  try {
    const { name, colors, edition, tags } = req.body;
    const palette = await Palette.create({
      name,
      colors,
      edition,
      tags,
      submittedBy: req.userId,
    });
    res.status(201).json(palette);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// save palette to user collection
export const savePalette = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (user.savedPalettes.includes(id)) {
      return res.status(400).json({ msg: "Palette already saved" });
    }

    user.savedPalettes.push(id);
    await user.save();
    res
      .status(200)
      .json({
        msg: "Palette saved successfully",
        savedPalettes: user.savedPalettes,
      });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// remove palette from collection
export const removePalette = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    user.savedPalettes = user.savedPalettes.filter((p) => p.toString() !== id);
    await user.save();

    res
      .status(200)
      .json({
        msg: "Palette removed successfully",
        savedPalettes: user.savedPalettes,
      });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
