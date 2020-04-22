import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from 'apollo-link-ws';

// import { onError } from "apollo-link-error";
// import { setContext } from "apollo-link-context";
// import SnackbarUtils from "../utils/snack";
// import history from "../utils/history";

const httpLink = createHttpLink({
	uri: "https://shopping-list-casinha.herokuapp.com/v1/graphql"
});

const link = new WebSocketLink({
	uri: "wss://shopping-list-casinha.herokuapp.com/v1/graphql",
	options: {
		reconnect: true
	}
})

export const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network"
		}
	}
});
