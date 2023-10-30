import { mapMutations } from 'vuex';

const modal = {
  methods: {
    ...mapMutations(['showModal', 'closeModal', 'setDetails']),
    getstrIngredientInfos(details) {
      const ingredientList = [];

      for (let iIn = 0; iIn <= 20; iIn++) {
        if (details[`strIngredient${iIn}`] && details[`strMeasure${iIn}`]) {
          ingredientList.push({
            ingredientList: details[`strIngredient${iIn}`],
            strMeasureList: details[`strMeasure${iIn}`],
          });
        }
      }

      return { ingredientList, ...details };
    },
    showDetails(value) {
      const formatedValue = this.getstrIngredientInfos(value);
      this.showModal(true);
      this.setDetails(formatedValue);
    },
  },
};

export default modal;
