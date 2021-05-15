all: test build_import

test:
	shellcheck -e SC2207 ./src/build_import.sh

build_import:
	./src/build_import.sh

clean:
	$(RM) out.json
