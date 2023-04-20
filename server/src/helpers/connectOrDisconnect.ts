/*
 *  This function is used with prisma (ORM) when you have a relation that is nullable.
 *  For example if you have a user <=> vehicle relationship where the
 *  user can and doesn't have to have a vehicle (vehicle is nullable).
 *
 *  When updating the user you can either assign him a vehicle (by sending the vehicle id)
 *  or you can send null if you want to remove the vehicle.
 *
 *  It will connect the relation if the id is sent, or if null is sent,
 *  it will disconnect the relation. If the value if undefined nothing will happen.
 */
export const connectOrDisconnect = (id?: number | null) => {
    // If nothing was sent do nothing
    if (id === undefined) {
        return;
    }

    // If null was sent disconnect the relation
    if (id === null) {
        return {
            disconnect: true
        } as any;
    }

    // If ID was sent connect the relation
    return {
        connect: {
            id
        }
    } as any;
};
