/**
 * Возвращает единицу измерения с правильным окончанием
 *
 * @function pluralize
 * @param {Number} value      Число
 * @param {Array} forms    Варианты слова ['час', 'часа', 'часов']
 * @return {String}
 */
export const getPluralLabel = (value, forms) => {
    const plural = {
        nom: forms[0],
        gen: forms[1],
        plu: forms[2],
    };

    const num = Math.abs(value);

    if (num.toString().indexOf(".") > -1) {
        return plural.gen;
    } else {
        return num % 10 === 1 && num % 100 !== 11
            ? plural.nom
            : num % 10 >= 2 &&
              num % 10 <= 4 &&
              (num % 100 < 10 || num % 100 >= 20)
            ? plural.gen
            : plural.plu;
    }
};
