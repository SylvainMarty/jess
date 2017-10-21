package apiutils

import (
	"log"
	"os"
	"path/filepath"
)

var (
	// AppPath is the absolute path of the API (the directory which contains server.bin)
	AppPath = findMainPath()
)

// Retrieve the path of the app executable (server.bin)
func findMainPath() string {
	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	exPath := filepath.Dir(ex)
	return exPath
}
