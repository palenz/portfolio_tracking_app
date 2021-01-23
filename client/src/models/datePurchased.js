const today = new Date();

export default {
    
    getTodaysDate() {
    
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        return date;
    },
}

