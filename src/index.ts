import * as express from "express";
import * as bodyParser from "body-parser";
import * as graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

let app = express();

let graphMiddleware = graphqlHTTP({
  schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
  rootValue: {
    events: () => {
      return ["Cooking", "Saling", "All-Night Coding"];
    },
    createEvent: args => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
});

app.use(bodyParser.json());

app.use("/graphql", graphMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
