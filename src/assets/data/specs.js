export const labelTransformer = (t) => {
    switch (t) {
        case 'energie':
            return 'Energie';
        case 'boite':
            return 'Boite';
        case 'cylindre':
            return 'Cylindrée';
        case 'nbr_cylindres':
            return 'Nombre cylindres';
        case 'type_moteur':
            return 'Type moteur';
        case 'couple':
            return 'Couple';
        case 'vitesse_max':
            return 'Vitesse max';
        case 'soupapes':
            return 'Soupapes';
        case 'reservoir':
            return 'Reservoir';
        case 'freins_avant':
            return 'Freins avant';
        case 'freins_arriere':
            return 'Freins arriere';
        default:
            return t;
    }
};

export const dataTransformer = (k, v) => {
    switch (k) {
        case 'cylindre':
            return `${v} cc`;
        case 'vitesse_max':
            return `${v} km/h`;
        case 'reservoir':
            return `${v} litres`;
        default:
            return v;
    }
};

export const dataReverseTransformer = (k, v) => {
    switch (k) {
        case 'cylindre':
            return v.slice(0, -3);
        case 'vitesse_max':
            return v.slice(0, -5);
        case 'reservoir':
            return v.slice(0, -7);
        default:
            return v;
    }
};
