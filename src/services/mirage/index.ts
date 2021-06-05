import {
  createServer,
  Model, Factory,
  Response,
  ActiveModelSerializer
} from 'miragejs';

import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 15);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function(schema, request) {
        const {
          page = 1,
          per_page = 10,
          name = null,
        } = request.queryParams;

        let usersList = this.serialize(schema.all('user')).users

        if(name) {
          usersList = usersList.reduce((accumulator, currentValue) => {
            if(
              name &&
              (
               currentValue.name.toLowerCase().indexOf(name.toLowerCase()) > -1 ||
               currentValue.email.toLowerCase().indexOf(name.toLowerCase()) > -1
              )
            ){
              accumulator = [...accumulator, currentValue]
            }

            return accumulator
          }, [])
        }

        const total = usersList.length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = usersList.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });

      this.get('/users/:id');
      this.post('/users');
      this.delete('/users/:id');
      this.put('/users/:id');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}