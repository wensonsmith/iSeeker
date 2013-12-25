### Phaclcon PHQL

    $this->di->set('modelsManager', function(){
			      return new Phalcon\Mvc\Model\Manager();
			 });
			$cars =$this->modelsManager->executeQuery("UPDATE WebddtTournamentContestant SET role_name = 'wenson'  ");

注意： 后面跟的不是表名，而是model的名字！