function getUserById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users[id]);
    }, 500);
  });
}
function getOrganizationById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(organizations[id]);
    }, 500);
  });
}

function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  return function getUserByIdWithOrganization(userId) {
    return getUserById(userId).then((user) => {
      if (!user) return undefined;
      return getOrganizationById(user.organizationId).then(
        (organization) => {
          if (organization) return { ...user, organization };
          throw "Org not found";
        },
        () => undefined
      );
    });
  };
}
