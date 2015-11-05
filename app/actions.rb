# Homepage (Root path)
get "/" do
  erb :index
end

get '/contacts' do 
  @contacts =  Contact.all.to_json
end

# create new contact
post '/contacts' do
  @contact = Contact.new(
    firstname: params[:firstname],
    lastname: params[:lastname],
    # email: params[:email],
    # phone_number: params[:phone_number]
    )
  if @contact.save
    @contact.to_json
    halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
  end
end

# find contact by id
get '/contacts/:id' do
  @contact = Contact.find(params[:id])
  halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
end

# update contact
put '/contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.update ({
    firstname: params[:firstname],
    lastname: params[:lastname],
    # email: params[:email],
    # phone_number: params[:phone_number]
    })
  if @contact.save
    @contact.to_json
    halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
  end
end

delete '/contacts/:id/delete' do
  Contact.find(params[:id]).destroy
end