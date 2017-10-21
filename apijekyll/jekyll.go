package apijekyll

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os/exec"
	"path"
	"sync"
	"syscall"

	"github.com/SylvainMarty/jess/apiutils"
)

// Jekyll process state codes
const (
	StateStopped = 0
	StateRunning = 1
)

// Jekyll represent the Jekyll process wrapper
//
// It allow to easily start and stop the child process
// The Jekyll instance must be unique
type Jekyll struct {
	// The Command associated with the Jekyll process
	Cmd *exec.Cmd
	// The state of the process
	state int
}

var (
	instance *Jekyll
	once     sync.Once
)

// GetInstance return a new or existing instance of Jekyll
// which is a part of the singleton pattern
func GetInstance() *Jekyll {
	once.Do(func() {
		instance = &Jekyll{
			Cmd:   nil,
			state: StateStopped,
		}
	})
	return instance
}

// Start Jekyll process
// Process is executed in goroutine
func (j *Jekyll) Start(projectPath string) (err error) {
	if j.state == StateStopped {
		j.Cmd = exec.Command(path.Join(apiutils.AppPath, "embedded", "jekyll", "traveling-jekyll-osx", "jekyll"), "serve", "-s", projectPath, "-d", path.Join(projectPath, "_site"))
		go func() {
			stdOut, err := j.Cmd.StdoutPipe()
			if err != nil {
				log.Panicln("Error creating StdoutPipe for jekyllProc", err)
			}

			defer stdOut.Close()

			scanner := bufio.NewScanner(stdOut)
			go func() {
				for scanner.Scan() {
					fmt.Printf("%s\n", scanner.Text())
				}
			}()

			err = j.Cmd.Start()
			if err != nil {
				log.Panicln("Error starting jekyllProc", err)
			}

			log.Println("Spawing Jekyll Process", j.Cmd.Process.Pid)

			// go generate command will fail when no generate command find.
			err = j.Cmd.Wait()
			if err != nil {
				if err.Error() != "exit status 1" {
					log.Panicln(err)
				}
			}
		}()
		j.state = StateRunning
		return nil
	}
	return errors.New("Cannot start Jekyll process. Jekyll already running")
}

// Stop Jekyll process
func (j *Jekyll) Stop() (err error) {
	if j.state == StateRunning {
		log.Println("Killing Jekyll Process", j.Cmd.Process.Pid)
		// see: https://medium.com/@felixge/killing-a-child-process-and-all-of-its-children-in-go-54079af94773
		err := syscall.Kill(j.Cmd.Process.Pid, syscall.SIGINT) // note the minus sign
		if err != nil {
			log.Panicln(err.Error())
			return err
		}
		j.state = StateStopped
		return nil
		// For windows: https://stackoverflow.com/questions/22470193/why-wont-go-kill-a-child-process-correctly
		// kill := exec.Command("TASKKILL", "/T", "/F", "/PID", strconv.Itoa(cmd.Process.Pid))
		// kill.Stderr = os.Stderr
		// kill.Stdout = os.Stdout
		// kill.Run()
	}
	return errors.New("Cannot stop Jekyll process. Jekyll is not started")
}
