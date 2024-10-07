export const AddDotToNumber = (number: number) => {
    try {
        const num =
            number !== undefined ? number.toString() : "";
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (error) {
        console.log("AddDotToNumber: ", error);
    }
}