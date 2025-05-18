export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];
// Utilisation de la méthode getMonth() renvoyant un nombre entre 0 et 11
// On utilise l'index pour récupérer le nom du mois correspondant dans l'objet MONTHS