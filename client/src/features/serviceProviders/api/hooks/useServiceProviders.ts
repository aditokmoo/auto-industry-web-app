import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsersBy } from "../services/serviceProviderServices";

interface ParamsType {
    type: string,
    value: string,
}

export function useGetUsers(params: ParamsType) {
    const query = useQuery({
        queryKey: ['getUsers'],
        queryFn: () => getUsersBy(params),
    });

    return query;
}