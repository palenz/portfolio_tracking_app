const today = new Date();

export default {
    
    getTodaysDate() {
        let strMonth = (today.getMonth()+1).toString();
        const date = today.getFullYear()+'-'+(strMonth.padStart(2, '0'))+'-'+today.getDate();
        return date;
    },
}

