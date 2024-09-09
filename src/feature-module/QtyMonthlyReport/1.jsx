   {/* // ! Sticky Columns (fix them) */}
                        {/* <table className="table table-bordered datanew">
                          <thead>
                            <tr>
                              <th
                                rowSpan="2"
                                className="sticky-column"
                                style={{
                                  backgroundColor: "#5E5E5E",
                                  color: "#fff",
                                }}
                              >
                                Customer
                              </th>
                              <th
                                rowSpan="2"
                                className="sticky-column"
                                style={{
                                  backgroundColor: "#5E5E5E",
                                  color: "#fff",
                                }}
                              >
                                Name
                              </th>
                              {months.map((month) => (
                                <th
                                  colSpan="4"
                                  key={month}
                                  className="text-center fixed-header"
                                  style={{
                                    backgroundColor: "#0E103D",
                                    color: "#fff",
                                  }}
                                >
                                  {month}
                                </th>
                              ))}
                            </tr>
                            <tr>
                              {months.map((month) => (
                                <React.Fragment key={month}>
                                  <th
                                    style={{
                                      width: "200px",
                                      backgroundColor: "#a4b9c4",
                                      color: "#000000",
                                    }}
                                  >
                                    Target
                                  </th>
                                  <th
                                    style={{
                                      width: "200px",
                                      backgroundColor: "#fffef2",
                                      color: "#000000",
                                    }}
                                  >
                                    Achievement
                                  </th>
                                  <th
                                    style={{
                                      width: "200px",
                                      backgroundColor: "lightgreen",
                                      color: "#000000",
                                    }}
                                  >
                                    Achievement %
                                  </th>
                                  <th
                                    style={{
                                      width: "200px",
                                      backgroundColor: "#fffef2",
                                      color: "#000000",
                                    }}
                                  >
                                    Pending Order
                                  </th>
                                </React.Fragment>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {displayedEntries.map((entry) => {
                              const [customer, name] = entry.split("|");
                              return (
                                <tr key={entry}>
                                  <td className="sticky-column">{customer}</td>
                                  <td
                                    className={`sticky-column ${
                                      name === "Total" ? "total-row" : ""
                                    }`}
                                  >
                                    {name}
                                  </td>
                                  {months.map((month) => {
                                    const monthData =
                                      data.find(
                                        ({ Customer, Name, Month }) =>
                                          Customer === customer &&
                                          Name === name &&
                                          Month === month
                                      ) || {};
                                    return (
                                      <React.Fragment key={month}>
                                        <td
                                          className={
                                            name === "Total"
                                              ? "total-row custom-tColor right-align"
                                              : "custom-tColor right-align"
                                          }
                                          style={{
                                            width: "200px",
                                          }}
                                        >
                                          {monthData.Transaction}
                                        </td>
                                        <td
                                          style={{ width: "200px" }}
                                          className={
                                            name === "Total"
                                              ? "total-row right-align"
                                              : "right-align"
                                          }
                                        >
                                          {monthData.Achievement}
                                        </td>
                                        <td
                                          style={{ width: "200px" }}
                                          className={
                                            name === "Total"
                                              ? "total-row right-align"
                                              : "right-align"
                                          }
                                        >
                                          {parseFloat(
                                            monthData.AchievementPercentage
                                          ).toFixed(2)}
                                          %
                                        </td>
                                        <td
                                          style={{ width: "200px" }}
                                          className={
                                            name === "Total"
                                              ? "total-row right-align"
                                              : "right-align"
                                          }
                                        >
                                          {monthData.PendingSo}
                                        </td>
                                      </React.Fragment>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table> */}









