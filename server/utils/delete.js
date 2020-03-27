export async function sequentiallyDelete(functionsToRun, integrationId, limit, totalRowsDeleted) {
  totalRowsDeleted = totalRowsDeleted || 0;
  if(functionsToRun.length === 0) {
    return true;
  } else {
    const nextFunc = functionsToRun[0];
    const queryResponse = await nextFunc(integrationId, limit);
    const rowsDeleted = queryResponse[1].rowCount;
    totalRowsDeleted += rowsDeleted;
    if(rowsDeleted < limit) {
      return sequentiallyDelete(functionsToRun.slice(1), integrationId, limit, totalRowsDeleted);
    }
    return false;
  }
}
