movies.sort_by!{ |a| a[:release_date] }

sort_by!(&:release_date) の方が、簡潔で分かりやすいかと思います。
