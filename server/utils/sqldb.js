export async function findOrBuild(Model, data) {
  let returned = await Model.findOne({
    where: data
  });
  if(!returned) {
    returned = Model.build(data);
  }
  return returned;
}
