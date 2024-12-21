
export const stringAvatar = (name, bgcolor) => {
    return {
        sx: {
            color: 'white',
            fontSize: 14,
            textTransform: 'uppercase',
            width: 30,
            height: 30,
            bgcolor: bgcolor,
        },
        children: name.split(' ').length >= 2 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.split(' ')[0][0]}`,
    };
}