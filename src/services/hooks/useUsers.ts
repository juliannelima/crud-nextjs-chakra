import { api } from "../api";

type User = {
  id: string,
  name: string;
  email: string;
  createdAt: Date;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users')

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };
  });

  return { users, totalCount };
}
