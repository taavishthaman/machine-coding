class UserManager {
  constructor(users) {
    this.userTable = new Map();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      this.userTable.set(user.getId(), user);
    }
  }

  getUser(id) {
    return this.userTable.get(id);
  }

  getIds() {
    const keys = [];
    for (let key of this.userTable.keys()) {
      keys.push(key);
    }
    return keys;
  }

  executeQuery(query) {
    const queryArr = query.length === 1 ? [query] : query.split(" ");
    const [type] = queryArr;
    if (type === "EXPENSE") {
      const userId = queryArr[1];
      const amount = Number(queryArr[2]);
      const numUsers = Number(queryArr[3]);
      const usersInvolved = [];

      for (let i = 0; i < numUsers; i++) {
        usersInvolved.push(queryArr[i + 4]);
      }

      const parameter = queryArr[numUsers + 4];
      const user = this.userTable.get(userId);
      if (parameter === "EQUAL") {
        let amountPerUser = amount / numUsers;
        //Make changes for the user who is spending the money
        for (let i = 0; i < usersInvolved.length; i++) {
          if (usersInvolved[i] === userId) {
            continue;
          }
          user.expenses[usersInvolved[i]] += amountPerUser;
        }

        //Make changes for the users who will owe the money
        for (let i = 0; i < usersInvolved.length; i++) {
          const userInvolvedId = usersInvolved[i];
          if (userInvolvedId === userId) {
            continue;
          }
          const userInvolved = this.userTable.get(userInvolvedId);
          userInvolved.expenses[userId] -= amountPerUser;
        }
      } else if (parameter === "EXACT") {
        const amountsPerUser = [];
        for (let i = numUsers + 5; i < 2 * numUsers + 5; i++) {
          amountsPerUser.push(Number(queryArr[i]));
        }

        //Make changes for the user who is spending the money
        for (let i = 0; i < usersInvolved.length; i++) {
          if (usersInvolved[i] === userId) {
            continue;
          }
          user.expenses[usersInvolved[i]] += amountsPerUser[i];
        }

        //Make changes for the users who will owe the money
        for (let i = 0; i < usersInvolved.length; i++) {
          const userInvolvedId = usersInvolved[i];
          if (userInvolvedId === userId) {
            continue;
          }
          const userInvolved = this.userTable.get(userInvolvedId);
          userInvolved.expenses[userId] -= amountsPerUser[i];
        }
      } else {
        const amountsPerUser = [];
        for (let i = numUsers + 5; i < 2 * numUsers + 5; i++) {
          amountsPerUser.push((amount * Number(queryArr[i])) / 100);
        }
        for (let i = numUsers + 5; i < 2 * numUsers + 5; i++) {
          amountsPerUser.push(Number(queryArr[i]));
        }

        //Make changes for the user who is spending the money
        for (let i = 0; i < usersInvolved.length; i++) {
          if (usersInvolved[i] === userId) {
            continue;
          }
          user.expenses[usersInvolved[i]] += amountsPerUser[i];
        }

        //Make changes for the users who will owe the money
        for (let i = 0; i < usersInvolved.length; i++) {
          const userInvolvedId = usersInvolved[i];
          if (userInvolvedId === userId) {
            continue;
          }
          const userInvolved = this.userTable.get(userInvolvedId);
          userInvolved.expenses[userId] -= amountsPerUser[i];
        }
      }
    } else {
      if (queryArr.length === 2) {
        //Show for only 1 user
        const result = this.getUserStatus(queryArr[1]);
        if (result.length === 0) {
          console.log("No balances");
        } else {
          for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
          }
        }
      } else {
        //Show for all users
        const userIds = this.getIds();
        let balanceExists = false;
        for (let i = 0; i < userIds.length; i++) {
          const result = this.getUserStatus(userIds[i]);
          if (result.length === 0) {
            //console.log("No balances");
            continue;
          } else {
            for (let j = 0; j < result.length; j++) {
              console.log(result[j]);
              balanceExists = true;
            }
          }
        }

        if (!balanceExists) {
          console.log("No balances");
        }
      }
    }
  }

  getUserStatus(userId) {
    const user = this.userTable.get(userId);
    const result = Object.keys(user.expenses)
      .map((id) => {
        const amount = user.expenses[id];
        if (amount < 0) {
          return `${user.name} owes ${this.userTable.get(id).name}: ${Math.abs(
            amount
          )}`;
        } else if (amount > 0) {
          return `${this.userTable.get(id).name} owes ${user.name}: ${Math.abs(
            amount
          )}`;
        }
      })
      .filter((status) => status);

    return result;
  }
}

class User {
  constructor(id, name, email, mobile) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.expenses = {};
  }

  initExpenses(userIds) {
    for (let id of userIds) {
      if (id !== this.id) {
        this.expenses[id] = 0;
      }
    }
  }

  getId() {
    return this.id;
  }
}

function main() {
  const user1 = new User("u1", "User1", "michael@gmail.com", "1234567890");
  const user2 = new User("u2", "User2", "gabriel@gmail.com", "1234567890");
  const user3 = new User("u3", "User3", "raphael@gmail.com", "1234567890");
  const user4 = new User("u4", "User4", "metatron@gmail.com", "1234567890");

  const manager = new UserManager([user1, user2, user3, user4]);

  const allIds = manager.getIds();

  user1.initExpenses(allIds);
  user2.initExpenses(allIds);
  user3.initExpenses(allIds);
  user4.initExpenses(allIds);

  const query1 = "SHOW";
  manager.executeQuery(query1);
  const query2 = "SHOW u1";
  manager.executeQuery(query2);
  const query3 = "EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL";
  manager.executeQuery(query3);
  const query4 = "SHOW u4";
  manager.executeQuery(query4);
  const query5 = "SHOW u1";
  manager.executeQuery(query5);
  const query6 = "EXPENSE u1 1250 2 u2 u3 EXACT 370 880";
  manager.executeQuery(query6);
  const query7 = "SHOW";
  manager.executeQuery(query7);
  const query8 = "EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20";
  manager.executeQuery(query8);
  const query9 = "SHOW u1";
  manager.executeQuery(query9);
  const query10 = "SHOW";
  manager.executeQuery(query10);
}

main();
