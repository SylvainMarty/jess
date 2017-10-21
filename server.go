package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/SylvainMarty/jess/apijekyll"

	"github.com/julienschmidt/httprouter"
)

// Global variables
var jekyll *apijekyll.Jekyll = apijekyll.GetInstance()

func Test(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
}

func StartJekyll(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// path = "/Users/Sylvain/Documents/Travail_Perso/_Git/manonlay.github.com"
	path := "/Users/Sylvain/Documents/Travail_Perso/_Git/manonlay.github.com"
	err := jekyll.Start(path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func StopJekyll(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	err := jekyll.Stop()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func routes() *httprouter.Router {
	r := httprouter.New()

	r.GET("/test/:name", Test)
	r.GET("/jekyll/start", StartJekyll)
	r.GET("/jekyll/stop", StopJekyll)

	return r
}

func main() {
	// API main routine
	api := &http.Server{
		Addr:    "localhost:9000",
		Handler: routes(),
	}
	log.Fatal(api.ListenAndServe())
}
