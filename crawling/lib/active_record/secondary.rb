module ActiveRecord
  class Secondary < ActiveRecord::Base
    establish_connection(
      :adapter => 'mysql2',
      :encoding => 'utf8',
      :reconnect => 'false',
      :database => 'pennappsfa2012',
      :pool => 5,
      :host => 'hulce.net',
      :username => 'pennapps',
      :password => 'pennapps',
      :socket => '/var/run/mysqld/mysqld.sock'
    )

  end

  class SecondaryMigration < ActiveRecord::Migration
    def connection
      ActiveRecord::Secondary.connection 
    end
  end

end
