NAME = hypertube

all: $(NAME)

$(NAME):
	docker stack deploy -c docker-stack.yml $(NAME)

clean:
	docker stack rm $(NAME)