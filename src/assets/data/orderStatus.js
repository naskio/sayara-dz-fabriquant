export default {
    0: 'En attente',
    1: 'Validée', // par le fabriquant
    2: 'Rejetée', // par le fabriquant
    3: 'Annulée', // par l'automobiliste
};

export const statusColor = (etat) => {
    switch (etat) {
        case 0:
            return '#d66600';
        case 1:
            return '#00b000';
        case 2:
            return '#c20000';
        default:
            return '#000';
    }
};
