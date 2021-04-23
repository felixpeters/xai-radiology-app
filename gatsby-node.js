const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const scanTemplate = path.resolve("src/templates/scan.js")

  const result = await graphql(`
    query {
      allScansJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild("Error while running scans query.")
    return
  }

  result.data.allScansJson.edges.forEach(({ node }) => {
    const id = node.id
    createPage({
      path: `/scans/${id}`,
      component: scanTemplate,
      context: {
        scanId: id,
      },
    })
  })
}
