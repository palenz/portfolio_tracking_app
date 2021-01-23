const today = new Date();

const getTodaysDate = function()  {

    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return date;
};
